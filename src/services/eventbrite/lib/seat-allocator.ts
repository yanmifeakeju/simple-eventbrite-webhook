type SeatArrangementConfig = {
  code: string;
  numberOfSeats: number;
  numberOfColumns: number;
};

export const seatAllocator = async (configs: SeatArrangementConfig[] = []) => {
  const seats = new Map<string, unknown>();

  for (let config of configs) {
  const letCurrentSeats = [];

    for (let i = 0; i < config.numberOfSeats; i++) {

    }
  }
};

seatAllocator();

async function* seatGenerator(num: number) {
  let count = 0;
  while (count < num) {
    yield ++count;
  }
}
