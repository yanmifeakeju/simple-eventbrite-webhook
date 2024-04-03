import { Type } from '@sinclair/typebox';

export const EventBriteWebhookSchema = Type.Object({
  api_url: Type.String(),
  config: Type.Object({
    action: Type.Union([
      Type.Literal('order.placed'),
      Type.Literal('order.updated'),
      Type.Literal('order.refunded'),
      Type.Literal('test') // test event
    ]),
    user_id: Type.String(),
    webhook_id: Type.String(),
    endpoint_url: Type.String()
  })
});

/**
 * {
  costs: {
    base_price: {
      display: '$0.00',
      currency: 'USD',
      value: 0,
      major_value: '0.00'
    },
    eventbrite_fee: {
      display: '$0.00',
      currency: 'USD',
      value: 0,
      major_value: '0.00'
    },
    gross: {
      display: '$0.00',
      currency: 'USD',
      value: 0,
      major_value: '0.00'
    },
    payment_fee: {
      display: '$0.00',
      currency: 'USD',
      value: 0,
      major_value: '0.00'
    },
    tax: {
      display: '$0.00',
      currency: 'USD',
      value: 0,
      major_value: '0.00'
    }
  },
  resource_uri: 'https://www.eventbriteapi.com/v3/orders/9290819589/',
  id: '9290819589',
  changed: '2024-04-01T12:46:34Z',
  created: '2024-04-01T12:45:19Z',
  name: 'Tunde Akeju',
  first_name: 'Tunde',
  last_name: 'Akeju',
  email: 'yanmifeakeju+checkout@gmail.com',
  status: 'placed',
  time_remaining: null,
  event_id: '871524813177'
}
 *
 */

export const EventBriteGetOrderDetailsSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  status: Type.String() // enum
});

/**
 * {
    "pagination": {
        "object_count": 1,
        "page_number": 1,
        "page_size": 50,
        "page_count": 1,
        "has_more_items": false
    },
    "attendees": [
        {
            "costs": {
                "base_price": {
                    "display": "$0.00",
                    "currency": "USD",
                    "value": 0,
                    "major_value": "0.00"
                },
                "eventbrite_fee": {
                    "display": "$0.00",
                    "currency": "USD",
                    "value": 0,
                    "major_value": "0.00"
                },
                "gross": {
                    "display": "$0.00",
                    "currency": "USD",
                    "value": 0,
                    "major_value": "0.00"
                },
                "payment_fee": {
                    "display": "$0.00",
                    "currency": "USD",
                    "value": 0,
                    "major_value": "0.00"
                },
                "royalty": {
                    "display": "$0.00",
                    "currency": "USD",
                    "value": 0,
                    "major_value": "0.00"
                },
                "tax": {
                    "display": "$0.00",
                    "currency": "USD",
                    "value": 0,
                    "major_value": "0.00"
                }
            },
            "resource_uri": "https://www.eventbriteapi.com/v3/orders/9290819589/attendees/15352852869/",
            "id": "15352852869",
            "changed": "2024-04-01T12:46:32Z",
            "created": "2024-04-01T12:46:32Z",
            "quantity": 1,
            "variant_id": null,
            "profile": {
                "first_name": "Tunde",
                "last_name": "Akeju",
                "email": "yanmifeakeju+checkout@gmail.com",
                "name": "Tunde Akeju",
                "addresses": {}
            },
            "barcodes": [
                {
                    "status": "unused",
                    "barcode": "929081958915352852869001",
                    "created": "2024-04-01T12:46:35Z",
                    "changed": "2024-04-01T12:46:35Z",
                    "checkin_type": 0,
                    "is_printed": false,
                    "qr_code_url": "https://www.eventbriteapi.com/qrcode/929081958915352852869001/?sig=AHTu1yYMILrGnPZdt3Roy9f6j9wQ-9ZNfg"
                }
            ],
            "answers": [],
            "checked_in": false,
            "cancelled": false,
            "refunded": false,
            "affiliate": "oddtdtcreator",
            "guestlist_id": null,
            "invited_by": null,
            "status": "Attending",
            "ticket_class_name": "General Admission",
            "delivery_method": "electronic",
            "event_id": "871524813177",
            "order_id": "9290819589",
            "ticket_class_id": "1460879529"
        }
    ]
}
 */

export const EventBriteGetOrderAttendeesSchema = Type.Object({
  pagination: Type.Object({
    object_count: Type.Number(),
    page_number: Type.Number(),
    page_size: Type.Number(),
    page_count: Type.Number(),
    has_more_items: Type.Boolean()
  }),
  attendees: Type.Array(
    Type.Object({
      id: Type.String(),
      changed: Type.String(),
      created: Type.String(),
      quantity: Type.Number(),
      variant_id: Type.Unknown(),
      profile: Type.Object({
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String(),
        name: Type.String(),
        addresses: Type.Unknown()
      })
    })
  )
});
