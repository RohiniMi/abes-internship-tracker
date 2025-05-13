import express from 'express';
import dashboardController from "../controller/dashboard.js"
const router = express.Router();

router.get('/',dashboardController);

export default router;