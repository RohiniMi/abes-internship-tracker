import {findBatchwiseAllData, findAllDataForXlsv, findDepartmentwiseAllData,findDepartmentWiseDataForXlsv,findBranchAndBatchwiseAllData } from "../services/dashboard.js";
// export const dashboardController = async (req, res) => {
//    const response = await findAllData();
//    res.status(response.status).json({ data: response.data });
// }
export const batchWiseDashboardController = async (req, res) => {
   const response = await findBatchwiseAllData(req.body.selectedBatch);
   res.status(response.status).json({ data: response.data,"batch":response.batch });
}
export const batchAndBranchwiseDashboardController = async (req, res) => {
   const response = await findBranchAndBatchwiseAllData(req.body.selectedBatch, req.body.selectedDepartments);
   res.status(response.status).json({ data: response.data });
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