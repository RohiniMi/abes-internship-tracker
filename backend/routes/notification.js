import express from 'express';
import {departmentWiseNotificationController} from "../controller/notification.js"
const router = express.Router();

router.post('/dept',departmentWiseNotificationController);

export default router;