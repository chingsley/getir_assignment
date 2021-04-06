import express from 'express';
import CollectionController from '../controllers/collection.controllers';
import CollectionMiddleware from '../middlewares/collection.middlewares';

const router = express.Router();

router.post(
  '/',
  CollectionMiddleware.validateReqBody,
  CollectionController.getCollection
);

export default router;
