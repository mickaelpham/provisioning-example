import express from 'express';
import morgan from 'morgan';
import config from './config';
import users from './routes/users';
import workspaces from './routes/workspaces';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/users', users);
app.use('/workspaces', workspaces);

app.listen(config.get('port'), () =>
  console.log(`🚀 Server started listening on port ${config.get('port')}`)
);
