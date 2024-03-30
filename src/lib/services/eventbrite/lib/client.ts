import { fetch } from 'undici';

const baseURL = process.env.EVENTBRITE_BASE_URL!;
const token = process.env.EVENTBRITE_AUTH_TOKEN!;

export const fetchOrdersAttendees = async (orderId: string) => {
  try {
    const response = await fetch(`${baseURL}/orders/${orderId}/attendees`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    console.error(`[FETCH_ATTENDEES]`, error);
  }
};
