import { LockFactory } from '@verrou/core';
import { memoryStore } from '@verrou/core/drivers/memory';
type SeatArrangementConfig = {
  code: string;
  numberOfSeats: number;
  skip: number;
};

const seats = new Map<string, string[]>();
const store = memoryStore();
const lockFactory = new LockFactory(store.factory());

export const seatAllocator = async (configs: SeatArrangementConfig[] = []) => {
  for (let config of configs) {
    let currentSeats = [];

    for (let i = 0; i < config.numberOfSeats; i++) {
      let seatNumber = i.toString().padStart(3, '0');
      currentSeats.push(`${config.code}${seatNumber}`);
    }

    seats.set(config.code, currentSeats);
    console.log(config.code, currentSeats.length);
  }
};

const CODE = 'A';

seatAllocator([
  {
    code: CODE,
    skip: 50,
    numberOfSeats: 10000
  }
]);

const lock = lockFactory.createLock('seats', '5s');
export async function assignSeats(seatNumber: number) {
  let acquired = await lock.acquire({ retry: { delay: 1000, attempts: 10 } });

  const availableSeats = seats.get(CODE);

  if (acquired) {
    if (availableSeats?.length && availableSeats.length >= seatNumber) {
      const getSeats = availableSeats.splice(0, seatNumber);
      seats.set(CODE, availableSeats);
      return getSeats;
    }
  }

  return [];
}
