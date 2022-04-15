import { StripeEvent, StripeEventStatus } from '@prisma/client';
import Stripe from 'stripe';
import database from '../../database';
import handleCustomerCreated from './handlers/customer-created';
import handleCustomerUpdated from './handlers/customer-updated';
import handlePaymentMethodAttached from './handlers/payment-method-attached';

const processEvent = async (record: StripeEvent, data: Stripe.Event) => {
  switch (record.type) {
    case 'customer.created':
      handleCustomerCreated(record, data);
      break;
    case 'customer.updated':
      handleCustomerUpdated(record, data);
      break;
    case 'payment_method.attached':
      handlePaymentMethodAttached(record, data);
      break;
    default:
      await database.stripeEvent.update({
        where: { externalId: record.externalId },
        data: { status: StripeEventStatus.SKIPPED },
      });
  }
};

export default processEvent;
