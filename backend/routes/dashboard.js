import express from 'express';
import {batchWiseDashboardController,batchWiseDashboardDownloadController,departmentWiseDashboardController,departmentWiseDashboardDownloadController,batchAndBranchwiseDashboardController} from "../controller/dashboard.js"
const router = express.Router();

// router.get('/',dashboardController);
router.post("/batch",batchWiseDashboardController);
router.post("/batch-and-branch",batchAndBranchwiseDashboardController);
router.post("/batch/download",batchWiseDashboardDownloadController);
router.post("/batch/dept",departmentWiseDashboardController);
router.post("/batch/dept/download",departmentWiseDashboardDownloadController);

export default router;