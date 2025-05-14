import {findAllData } from "../services/dashboard.js";
const dashboardController = async(req,res)=>{   
   const response = await findAllData();   
   res.status(response.status).json({data:response.data});           
}
export default dashboardController;