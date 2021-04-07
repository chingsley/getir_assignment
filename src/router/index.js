import express from 'express';

import recordsRoute from './record.routes';

const router = express.Router();

router.use('/records', recordsRoute);

export default router;
