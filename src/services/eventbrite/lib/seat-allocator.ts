import {LockFactory} from '@verrou/core';
import {memoryStore} from '@verrou/core/drivers/memory';
type SeatArrangementConfig = {
  code: string;
  numberOfSeats: number;
  skip: number;
};

const seats = new Map<string, string[]>();
const store = memoryStore();
const lockFactory = new LockFactory(store.factory())

export const seatAllocator = async (configs: SeatArrangementConfig[] = []) => {

  for (let config of configs) {
  let currentSeats = [];

    for (let i = 0; i < config.numberOfSeats; i++) {
      let seatNumber = i.toString().padStart(3, '0');
      currentSeats.push(`${config.code}${seatNumber}`)
    }

    seats.set(config.code, currentSeats)
    console.log(config.code, currentSeats.length)
  }


};

seatAllocator([{
code: 'A',
skip: 50,
numberOfSeats: 10000
}]);

export async function assignSeat(seatNumber: number) {
  const availableSeats = seats.get('A')
  const lock = lockFactory.createLock('seats');
  let acquired =await lock.acquire({retry: {timeout: '5s', delay: 1000, attempts: 3}})

  let result: number | undefined;

  let count = 0;

  while(count < 3 && !acquired) {
    acquired = await lock.acquire({retry: {timeout: '5s', delay: 1000, attempts: 3}})


  console.log(acquired)

  if(acquired)
     result = availableSeats?.length;


return result;
}
console.log(await Promise.all([assignSeat(5), assignSeat(5)]))
// const s = await assignSeat(5);
// console.log(s)
