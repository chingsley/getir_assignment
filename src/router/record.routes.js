import express from 'express';
import CollectionController from '../controllers/record.controllers';
import CollectionMiddleware from '../middlewares/record.middlewares';

const router = express.Router();

router.post(
  '/',
  CollectionMiddleware.validateReqBody,
  CollectionController.getCollection
);

export default router;
