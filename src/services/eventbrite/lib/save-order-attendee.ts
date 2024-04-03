import { Value } from '@sinclair/typebox/value';
import { setupBullMQ } from '../../../queue/lib/index.js';
import { EventBritePayload } from '../types/index.js';
import { fetchOrderDetailsByID, fetchOrdersAttendees } from './client.js';
import {
  EventBriteGetOrderAttendeesSchema,
  EventBriteGetOrderDetailsSchema
} from '../schema/index.js';
import { db } from '../../../database/index.js';
import { orders, ordersAttendees } from '../../../database/schema.js';

const { Clean, Check } = Value;

const processOrders = async (payload: EventBritePayload) => {
  console.log(payload);
  if (payload.config.action === 'order.placed') {
    const parsedUrl = new URL(payload.api_url);
    const orderId = parsedUrl.pathname.split('/').at(-2);

    if (!orderId) throw new TypeError(`Empty order ID ${payload.api_url}`);

    try {
      const data = await fetchOrderDetailsByID(orderId);
      const details = Clean(EventBriteGetOrderDetailsSchema, data);

      const isValidOrder = Check(EventBriteGetOrderDetailsSchema, details);
      if (!isValidOrder) throw new TypeError('Payload fail validation.');

      const attendeesData = await fetchOrdersAttendees(orderId);

      const attendeesDetails = Clean(
        EventBriteGetOrderAttendeesSchema,
        attendeesData
      );

      const isValidAttendees = Check(
        EventBriteGetOrderAttendeesSchema,
        attendeesDetails
      );

      if (!isValidAttendees) {
        const err = [
          ...Value.Errors(EventBriteGetOrderAttendeesSchema, attendeesDetails)
        ];

        console.log(JSON.stringify(err, null, ' '));
        throw new TypeError('Payload fail validation.');
      }

      const insertedOrder = await db.transaction(
        async (tx) => {
          console.log('Savings Order and Attendees');
          const [insertedOrder] = await tx
            .insert(orders)
            .values({
              email: details.email,
              name: details.name,
              order_id: details.id
            })
            .returning({ orderId: orders.id });

          if (!insertedOrder) {
            tx.rollback();
            return;
          }

          const attendees = attendeesDetails.attendees.map((details) => ({
            attendee_id: details.id,
            order_id: insertedOrder.orderId
          }));

          await tx.insert(ordersAttendees).values(attendees);

          console.log('Order and Attendees Saved.');

          return insertedOrder;
        },
        { behavior: 'exclusive' } //probably not performant.
      );

      console.log(
        `${orderId} processed with record ID ${insertedOrder?.orderId}`
      );
      console.log(
        `Attendees count ${attendeesDetails.pagination.object_count}`
      );
    } catch (err) {
      console.log(err);
    }
  }
};

const ordersQueue = setupBullMQ<EventBritePayload, void>({
  jobName: 'eventbrite',
  handler: processOrders,
  workerOptions: {
    autorun: false
  }
});

export const publishOrder = ordersQueue.publish;
export const consumeOrders = ordersQueue.consume;
