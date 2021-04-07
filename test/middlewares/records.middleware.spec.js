/* eslint-disable jest/expect-expect */
import supertest from 'supertest';
import server from '../../src/server';
import mongoose from 'mongoose';
import RecordsMiddleware from '../../src/middlewares/record.middlewares';
require('dotenv').config();

const app = supertest(server);

describe('RecordsMiddleware', () => {
  describe('getRecords', () => {
    const samplePayload = {
      data: {
        startDate: '2016-01-01',
        endDate: '2017-01-01',
        minCount: 1000,
        maxCount: 2000,
      },
      set(key, value) {
        return {
          ...this.data,
          [key]: value,
        };
      },
    };
    beforeAll(async () => {
      jest.setTimeout(30000);
      await mongoose.connect(process.env.DATABASE_URL_TEST, {
        useNewUrlParser: true, // To use the new parser,
        useUnifiedTopology: true, // To use the new Server Discover and Monitoring engin
      });
    });

    it('returns status 400 with code 3 and an error msg for any missing fields', async (done) => {
      try {
        const requiredFields = ['startDate', 'endDate', 'minCount', 'maxCount'];
        for (let field of requiredFields) {
          const res = await app
            .post('/api/records')
            .send(samplePayload.set(field, undefined));
          const { code, msg } = res.body;
          expect(code).toEqual(3);
          expect(msg).toEqual(`"${field}" is required`);
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('returns code number 3 if any of startDate or endDate is not in the format YYYY-MM-DD', async (done) => {
      try {
        const dateFieds = ['startDate', 'endDate'];
        for (let field of dateFieds) {
          const res = await app
            .post('/api/records')
            .send(samplePayload.set(field, '20-02-2020'));
          const { code, msg } = res.body;
          expect(code).toEqual(3);
          expect(msg).toEqual(`"${field}" must be in YYYY-MM-DD format`);
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('returns code number 3 if any of minCount or maxCount is not a number', async (done) => {
      try {
        const numberFields = ['minCount', 'maxCount'];
        for (let field of numberFields) {
          const res = await app
            .post('/api/records')
            .send(samplePayload.set(field, '240a'));
          const { code, msg } = res.body;
          expect(code).toEqual(3);
          expect(msg).toEqual(`"${field}" must be a number`);
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('returns code number 2 with status 404 if the path is not found', async (done) => {
      try {
        const res = await app.get('/api/records').send(samplePayload.data);
        const { code, msg } = res.body;
        expect(code).toEqual(2);
        expect(msg).toBe('path not found');
        expect(res.status).toBe(404);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('can ping the server to check if it"s running', async (done) => {
      try {
        const res = await app.get('/ping');
        expect(res.status).toBe(200);
        expect(res.body).toBe('server up and running....');
        done();
      } catch (e) {
        done(e);
      }
    });

    it('catches internal server errors in the controller"s catch block', async (done) => {
      try {
        const req = undefined;
        const res = { body: {} };
        const next = jest.fn();
        await RecordsMiddleware.validateReqBody(req, res, next);
        expect(next).toHaveBeenCalled();
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
