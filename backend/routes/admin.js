import express from 'express';
import {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} from '../controller/admin/department.js';
import {
    getAllSections,
    createSection,
    updateSection,
    deleteSection
} from "../controller/admin/section.js"; 
import {
    getAllSessions,
    createSession,
    updateSession,
    deleteSession
} from "../controller/admin/session.js"


const router = express.Router();

router.get('/manage-departments', getAllDepartments);
router.post('/manage-departments', createDepartment);
router.put('/manage-departments/:id', updateDepartment);
router.delete('/manage-departments/:id', deleteDepartment);

router.get('/manage-sections', getAllSections);
router.post('/manage-sections', createSection);
router.put('/manage-sections/:id', updateSection);
router.delete('/manage-sections/:id', deleteSection);

router.get('/manage-sessions', getAllSessions);
router.post('/manage-sessions', createSession);
router.put('/manage-sessions/:id', updateSession);
router.delete('/manage-sessions/:id', deleteSession);

export default router;
