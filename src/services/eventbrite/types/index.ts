import { Static } from '@sinclair/typebox';
import { EventBriteWebhookSchema } from '../schema/index.js';

export type EventBritePayload = Static<typeof EventBriteWebhookSchema>;
