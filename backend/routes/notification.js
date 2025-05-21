import express from 'express';
import {departmentWiseNotificationController,saveInternshipDataController} from "../controller/notification.js"
const router = express.Router();

router.post('/dept',departmentWiseNotificationController);
router.post('/internship',saveInternshipDataController);

export default router;