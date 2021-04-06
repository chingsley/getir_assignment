import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import dotenv from 'dotenv';

import swaggerDoc from './swagger.json';

import routes from './router';

dotenv.config();
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use(bodyParser.urlencoded({ extended: true }));

server.use(
  morgan('dev', {
    skip: () => (process.env.NODE_ENV === 'test' ? true : false),
  })
);

server.use('/api', routes);
server.use((error, req, res, next) => {
  if (error) {
    if (typeof error === 'object') {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  } else {
    next();
  }
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

server.all(['/', '/ping'], function (req, res) {
  res.status(200).json('server up and running....');
});

server.use(function (req, res) {
  res.status(404).json({ error: 'path not found' });
});

export default server;
