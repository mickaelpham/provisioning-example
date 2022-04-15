import { createClient } from 'redis';
import logger from './logger';

const redis = createClient();

redis.on('error', logger.error);

export default redis;
