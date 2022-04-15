import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 4000,
    env: 'PORT',
    arg: 'port',
  },
  databaseUrl: {
    doc: 'Database host URL',
    format: '*',
    env: 'DATABASE_URL',
  },
  stripeSecretKey: {
    doc: 'Stripe API Secret Key',
    default: '',
    env: 'STRIPE_SECRET_KEY',
  },
  stripePollInterval: {
    doc: 'How often do we poll Stripe for new events, in seconds',
    default: 30,
    env: 'SRIPE_POLL_INTERVAL',
  },
});

// Perform validation
config.validate({ allowed: 'strict' });

export default config;
