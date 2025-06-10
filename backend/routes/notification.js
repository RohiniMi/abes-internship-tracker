import express from 'express';
import {departmentWiseNotificationController,saveInternshipDataController,sendEmailController} from "../controller/notification.js";
import upload from "../utils/multerConfig.js";
const router = express.Router();

router.post('/notification',departmentWiseNotificationController);
router.post('/internship',saveInternshipDataController);
router.post('/sendEmail', upload.single("file"), sendEmailController);

export default router;