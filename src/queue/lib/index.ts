import { BullMQConfig, buildMQ } from './bull/build.js';

export const setupBullMQ = <JobData, JobResult>(
  config: BullMQConfig<JobData, JobResult>
) => {
  const { queue, worker } = buildMQ(config);
  return {
    publish(data: JobData) {
      queue.add('test', data);
    },
    consume() {
      worker.run();
    }
  };
};
