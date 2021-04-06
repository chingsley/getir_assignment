import express from 'express';
import RecordsController from '../controllers/record.controllers';
import RecordsMiddleware from '../middlewares/record.middlewares';

const router = express.Router();

router.post(
  '/',
  RecordsMiddleware.validateReqBody,
  RecordsController.getRecords
);

export default router;
