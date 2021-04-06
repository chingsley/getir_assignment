require('dotenv').config();
const { log, color } = require('./utils/logger');
import mongoose from 'mongoose';
import config from './database/config';
import server from './server';

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const DB_URL = config[env].DB_CONNECTION_STRING;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true, // To use the new parser,
    useUnifiedTopology: true, // To use the new Server Discover and Monitoring engin
  })
  .then(() => {
    log('connected to', color.yellow, env, color.blue, 'database');
    server.listen(PORT, function () {
      const { address, port } = this.address();
      const url = `http://${address === '::' ? 'localhost' : address}:${port}`;
      log('server started on: ', url);
    });
  })
  .catch((error) => {
    log(error);
  });
