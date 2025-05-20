import {findBatchwiseAllData, findAllDataForXlsv, findDepartmentwiseAllData,findDepartmentWiseDataForXlsv } from "../services/dashboard.js";
// export const dashboardController = async (req, res) => {
//    const response = await findAllData();
//    res.status(response.status).json({ data: response.data });
// }
export const batchWiseDashboardController = async (req, res) => {
   const response = await findBatchwiseAllData(req.body.selectedBatch);
   res.status(response.status).json({ data: response.data,"batch":response.batch });
}
export const batchWiseDashboardDownloadController = async (req, res) => {
   const response = await findAllDataForXlsv(req.body.selectedBatch);
   res.status(response.status).json({ data: response.data });
}
export const departmentWiseDashboardController = async (req, res) => {
   const response = await findDepartmentwiseAllData(req.body.selectedBatch, req.body.dept);
   res.status(response.status).json({ data: response.data ,"batch":response.batch });
}
export const departmentWiseDashboardDownloadController = async(req,res) => {
   const response = await findDepartmentWiseDataForXlsv(req.body.selectedBatch,req.body.selectedBatch,req,body.dept);
   res.status(response.status).json({ data: response.data });
}