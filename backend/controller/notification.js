import {findDepartmentWiseNotification,saveInternship} from "../services/notification.js";
export const departmentWiseNotificationController = async (req, res) => {
   const response = await findDepartmentWiseNotification(req.body.dept);
   res.status(response.status).json({ data: response.data});
}
export const saveInternshipDataController = async (req, res) => {
    const response = await saveInternship(req.body.id);
    res.status(response.status).json({ message: response.message});
 }