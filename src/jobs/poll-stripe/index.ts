import stripe from '../../stripe';
import logger from '../../logger';
import saveToDatabase from './save-to-database';
import redis from '../../redis';

const REDIS_LAST_EVENT_KEY = 'stripe:poll:lastProcessedEvent';

const pollStripe = async () => {
  // retrieve the last event we inserted
  const lastProcessedEvent = await redis.get(REDIS_LAST_EVENT_KEY);

  logger.info(`last processed Stripe event [externalId=${lastProcessedEvent}]`);

  // use its ID to fetch the next 10 events from Stripe
  const { data: events } = await stripe.events.list({
    starting_after: lastProcessedEvent || undefined,
  });

  logger.info(`retrieved events from Stripe [size=${events.length}]`);

  // update the last event we retrieved
  if (events.length > 0) {
    await redis.set(REDIS_LAST_EVENT_KEY, events[events.length - 1].id);
  }

  // save and process each event
  events.forEach(saveToDatabase);
};

export default pollStripe;
