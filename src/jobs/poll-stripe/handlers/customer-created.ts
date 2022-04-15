import { StripeEvent, StripeEventStatus } from '@prisma/client';
import Stripe from 'stripe';
import database from '../../../database';

const handleCustomerCreated = async (
  record: StripeEvent,
  data: Stripe.Event
) => {
  await database.stripeEvent.update({
    where: { externalId: record.externalId },
    data: { status: StripeEventStatus.PROCESSED, processedAt: new Date() },
  });
};

export default handleCustomerCreated;
