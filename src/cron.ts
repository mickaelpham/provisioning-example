import cron from 'node-cron';
import config from './config';
import pollStripe from './jobs/poll-stripe';
import redis from './redis';

// init
redis.connect().then(() => {
  cron.schedule(`*/${config.get('stripePollInterval')} * * * * *`, () => {
    pollStripe();
  });
});
