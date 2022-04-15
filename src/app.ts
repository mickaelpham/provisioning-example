import express from 'express';
import morgan from 'morgan';
import config from './config';
import billingProfiles from './routes/billing-profiles';
import users from './routes/users';
import workspaces from './routes/workspaces';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/users', users);
app.use('/workspaces', workspaces);
app.use('/billing-profiles', billingProfiles);

app.listen(config.get('port'), () =>
  console.log(`🚀 Server started listening on port ${config.get('port')}`)
);
