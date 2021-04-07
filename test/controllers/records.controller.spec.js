/* eslint-disable jest/expect-expect */
import supertest from 'supertest';
import server from '../../src/server';
import mongoose from 'mongoose';
import Records from '../../src/database/models/Records';
require('dotenv').config();

const app = supertest(server);

describe('RecordsController', () => {
  describe('getRecords', () => {
    let res;
    const samplePayload = {
      startDate: '2016-01-01',
      endDate: '2017-01-01',
      minCount: 1000,
      maxCount: 2000,
    };
    beforeAll(async () => {
      jest.setTimeout(30000);
      await mongoose.connect(process.env.DATABASE_URL_TEST, {
        useNewUrlParser: true, // To use the new parser,
        useUnifiedTopology: true, // To use the new Server Discover and Monitoring engin
      });
      res = await app.post('/api/records').send(samplePayload);
    });

    it('returns status 200 on successful GET', async (done) => {
      try {
        expect(res.status).toBe(200);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('returns code 0 and message "success" for a successful response', async (done) => {
      try {
        const { code, msg } = res.body;
        expect(code).toEqual(0);
        expect(msg).toEqual('success');
        done();
      } catch (e) {
        done(e);
      }
    });

    it('returns records that match the search criteria', async (done) => {
      try {
        const { records } = res.body;
        expect(records.length).toBeGreaterThan(0);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('ensures every record in the response has createdAt greater than or equal to the startDate', async (done) => {
      try {
        const { records } = res.body;
        const { startDate } = samplePayload;
        for (let { createdAt } of records) {
          expect(new Date(createdAt).getTime()).toBeGreaterThanOrEqual(
            new Date(startDate).getTime()
          );
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('ensures every record in the response has createdAt less than the endDate', async (done) => {
      try {
        const { records } = res.body;
        const { endDate } = samplePayload;
        for (let { createdAt } of records) {
          expect(new Date(createdAt).getTime()).toBeLessThan(
            new Date(endDate).getTime()
          );
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('ensures every record in the response has totalCount greater than minCount', async (done) => {
      try {
        const { records } = res.body;
        const { minCount } = samplePayload;
        for (let { totalCount } of records) {
          expect(totalCount).toBeGreaterThan(minCount);
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('ensures every record in the response has totalCount less than maxCount', async (done) => {
      try {
        const { records } = res.body;
        const { maxCount } = samplePayload;
        for (let { totalCount } of records) {
          expect(totalCount).toBeLessThan(maxCount);
        }
        done();
      } catch (e) {
        done(e);
      }
    });

    it('returns code number 1 for internal server errors with status 500', async (done) => {
      try {
        const originalImplementation = Records.find;
        const sampleError = 'bummer!';
        Records.find = jest.fn().mockImplementation(() => {
          throw new Error(sampleError);
        });
        const res = await app.post('/api/records').send(samplePayload);
        const { code, msg } = res.body;
        expect(code).toEqual(1);
        expect(msg).toEqual(sampleError);
        expect(res.status).toBe(500);
        Records.find = originalImplementation;
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
