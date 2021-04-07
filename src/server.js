import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

// import config from './database/config';
// const env = process.env.NODE_ENV || 'development';
// const DB_URL = config[env].DB_CONNECTION_STRING;
// console.log(env, DB_URL);

import dotenv from 'dotenv';

import swaggerDoc from './swagger.json';

import routes from './router';

dotenv.config();
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(
  morgan('dev', {
    skip: () => (process.env.NODE_ENV === 'test' ? true : false),
  })
);

server.use('/api', routes);
server.use((error, req, res, next) => {
  if (error) {
    if (typeof error === 'object') {
      res.status(500).json({ code: 1, msg: error.message });
    } else {
      res.status(500).json({ code: 1, msg: error });
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
  res.status(404).json({ code: 2, msg: 'path not found' });
});

export default server;
