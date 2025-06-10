import { findDepartmentWiseNotification, saveInternship,sendEmailofIdPass } from "../services/notification.js";
export const departmentWiseNotificationController = async (req, res) => {
   const response = await findDepartmentWiseNotification(req.body.dept);
   res.status(response.status).json({ data: response.data });
}
export const saveInternshipDataController = async (req, res) => {
   const response = await saveInternship(req.body.id);
   res.status(response.status).json({ message: response.message });
}
export const sendEmailController = async (req, res) => {
  try {
    const response = await sendEmailofIdPass(req.file, req.body);
    res.status(response.status).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};