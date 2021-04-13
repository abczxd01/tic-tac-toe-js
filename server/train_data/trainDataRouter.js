import Router from 'express';
import TrainDataController from './TrainDataController.js';

const router = new Router();
router.get('', TrainDataController.get);

export default router;
