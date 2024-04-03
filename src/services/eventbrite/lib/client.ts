import { fetch } from 'undici';

const BASE_URL = process.env.EVENTBRITE_BASE_URL!;
const AUTH_TOKEN = process.env.EVENTBRITE_AUTH_TOKEN!;
const ORDERS_BASE_URL = `${BASE_URL}/orders`;

export const fetchOrdersAttendees = async (orderId: string) => {
  try {
    const response = await fetch(`${ORDERS_BASE_URL}/${orderId}/attendees`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return response.json();
  } catch (error) {
    console.error(`[FETCH_ATTENDEES]`, error);
  }
};

export const fetchOrderDetailsByID = async (orderId: string) => {
  try {
    const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return response.json();
  } catch (error) {
    console.error(`[FETCH_ATTENDEES]`, error);
  }
};
