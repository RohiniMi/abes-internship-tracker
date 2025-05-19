import express from 'express';
import {dashboardController,batchWiseDashboardController,batchWiseDashboardDownloadController} from "../controller/dashboard.js"
const router = express.Router();

router.get('/',dashboardController);
router.post("/batch",batchWiseDashboardController);
router.post("/batch/download",batchWiseDashboardDownloadController);

export default router;