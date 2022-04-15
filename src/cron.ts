import cron from 'node-cron';
import config from './config';
import pollStripe from './jobs/poll-stripe';

cron.schedule(`*/${config.get('stripePollInterval')} * * * * *`, () => {
  pollStripe();
});
