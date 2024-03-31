import { Type } from '@sinclair/typebox';

export const EventBriteWebhookSchema = Type.Object({
  api_url: Type.String(),
  config: Type.Object({
    action: Type.Union([
      Type.Literal('order.placed'),
      Type.Literal('order.updated')
    ]),
    user_id: Type.String(),
    webhook_id: Type.String(),
    endpoint_url: Type.String()
  })
});
