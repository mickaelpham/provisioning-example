import { PrismaClient } from '@prisma/client';
import logger from './logger';

const database = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

database.$on('query', ({ query, params, duration }) => {
  logger.debug(
    `query: ${query} | params: ${params} | duration: ${duration} ms`
  );
});

export default database;
