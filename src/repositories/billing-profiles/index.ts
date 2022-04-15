import { Prisma, User } from '@prisma/client';
import Stripe from 'stripe';
import database from '../../database';
import stripe from '../../stripe';

export type BillingProfileCreateParams = Omit<
  Prisma.BillingProfileCreateInput,
  'externalId' | 'user'
>;

export const create = async (
  user: User,
  params: BillingProfileCreateParams
) => {
  // First create a Stripe customer
  const payload: Stripe.CustomerCreateParams = {
    name: user.name,
    email: params.email || user.email,
  };

  // Add the address to the payload if line1 is preset (Stripe restriction)
  if (params.line1) {
    payload.address = {
      line1: params.line1,
    };

    if (params.line2) payload.address.line2 = params.line2;
    if (params.city) payload.address.city = params.city;
    if (params.country) payload.address.country = params.country;
    if (params.postalCode) payload.address.postal_code = params.postalCode;
  }

  const customer = await stripe.customers.create(payload);

  return await database.billingProfile.create({
    data: { ...params, externalId: customer.id, userId: user.id },
  });
};
