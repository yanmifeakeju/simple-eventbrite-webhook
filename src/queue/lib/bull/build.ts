import {
  Queue,
  Worker,
  type QueueBaseOptions,
  type Processor,
  type WorkerOptions
} from 'bullmq';

const buildQueue = (name: string, opts: QueueBaseOptions) => {
  return new Queue(name, opts);
};

const buildWorker = <JobData, WorkerResult>(
  name: string,
  processor: Processor<JobData, WorkerResult>,
  opts: WorkerOptions
) => {
  return new Worker(name, processor, opts);
};

type Handler<T, U> = (args: T) => Promise<U>;

export type BullMQConfig<T, U> = {
  jobName: string;
  handler: Handler<T, U>;
  queueOptions?: Omit<QueueBaseOptions, 'connection'>;
  workerOptions?: Omit<WorkerOptions, 'connection'>;
};

export const buildMQ = <JobData, ResultData>(
  config: BullMQConfig<JobData, ResultData>
) => {
  const queue = buildQueue(config.jobName, {
    ...config.queueOptions,
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: +process.env.REDIS_PORT! || 6379
    }
  });

  const worker = buildWorker<JobData, ResultData>(
    config.jobName,
    async (job) => {
      const result = await config.handler(job.data);
      return result;
    },
    {
      ...config.workerOptions,
      connection: { host: 'localhost' }
    }
  );
  return { queue, worker };
};
