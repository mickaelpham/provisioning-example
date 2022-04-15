import express from 'express';
import morgan from 'morgan';
import config from './config';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/hello/:name', (req, res) => {
  res.send({ msg: `Hello, ${req.params.name}!` });
});

app.listen(config.get('port'), () =>
  console.log(`🚀 Server started listening on port ${config.get('port')}`)
);
