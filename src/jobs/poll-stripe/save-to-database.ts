import { StripeEventStatus } from '@prisma/client';
import Stripe from 'stripe';
import database from '../../database';
import logger from '../../logger';
import processEvent from './process-event';

const saveToDatabase = async (event: Stripe.Event) => {
  // save it to the database
  logger.info(`about to save event to database [externalId=${event.id}]`);
  const record = await database.stripeEvent.create({
    data: {
      externalId: event.id,
      type: event.type,
      created: new Date(event.created * 1_000), // Stripe uses seconds
      apiVersion: event.api_version,
      status: StripeEventStatus.PENDING,
    },
  });

  processEvent(record, event);
};

export default saveToDatabase;
