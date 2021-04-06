import express from 'express';

import collectionsRoute from './collection.routes';

const router = express.Router();

router.use('/collections', collectionsRoute);

export default router;
