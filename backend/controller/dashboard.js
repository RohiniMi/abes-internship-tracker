import {findAllData,findBatchwiseAllData,findAllDataForXlsv } from "../services/dashboard.js";
export const dashboardController = async(req,res)=>{   
   const response = await findAllData();   
   res.status(response.status).json({data:response.data});           
}
export const batchWiseDashboardController = async(req,res)=>{    
   const response = await findBatchwiseAllData(req.body.selectedBatch); 
   res.status(response.status).json({data:response.data});           
}
export const batchWiseDashboardDownloadController = async(req,res)=>{   
   const response = await findAllDataForXlsv(req.body.selectedBatch);   
   res.status(response.status).json({data:response.data});      
}