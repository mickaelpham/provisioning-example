import stripe from '../../stripe';
import database from '../../database';
import logger from '../../logger';
import saveToDatabase from './save-to-database';

const pollStripe = async () => {
  // retrieve the last event we inserted
  const lastEvent = await database.stripeEvent.findFirst({
    orderBy: [{ created: 'desc' }],
  });

  logger.info(
    `last processed Stripe event [externalId=${lastEvent?.externalId}]`
  );

  // use its ID to fetch the next 10 events from Stripe
  const stripeEvents = await stripe.events.list({
    starting_after: lastEvent?.externalId,
  });

  logger.info(
    `retrieved events from Stripe [size=${stripeEvents.data.length}]`
  );

  // save and process each event
  stripeEvents.data.forEach(saveToDatabase);
};

export default pollStripe;
