import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    DB_CONNECTION_STRING: process.env.DATABASE_URL_DEV,
  },
  production: {
    DB_CONNECTION_STRING: process.env.DATABASE_URL_PROD,
  },
  test: {
    DB_CONNECTION_STRING: process.env.DATABASE_URL_TEST,
  },
  staging: {
    DB_CONNECTION_STRING: process.env.DATABASE_URL_STAGING,
  },
};
