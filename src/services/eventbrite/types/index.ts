import { Static } from '@sinclair/typebox';
import {
  EventBriteWebhookSchema,
  EventBriteGetOrderDetailsSchema,
  EventBriteGetOrderAttendeesSchema
} from '../schema/index.js';

export type EventBritePayload = Static<typeof EventBriteWebhookSchema>;
export type EventBriteOrderDetails = Static<
  typeof EventBriteGetOrderDetailsSchema
>;

export type EventBriteOrderAttendees = Static<
  typeof EventBriteGetOrderAttendeesSchema
>;
