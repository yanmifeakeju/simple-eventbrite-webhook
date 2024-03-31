import { setupBullMQ } from '../../../queue/lib/index.js';
import { EventBritePayload } from '../types/index.js';

const processOrders = async (order: EventBritePayload) => {
  console.log('order received: ');
  console.log(order);
};

const ordersQueue = setupBullMQ<EventBritePayload, void>({
  jobName: 'eventbrite',
  handler: processOrders
});

export const publishOrder = ordersQueue.publish;
export const consumeOrders = ordersQueue.consume;
