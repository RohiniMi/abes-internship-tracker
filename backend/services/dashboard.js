import Student from "../models/student.js";

export const findAllData = async()=>{
    let status = 500;
    let data = [];
    data = await Student.find();
    if(data){
      status = 200;
    }
    return {status,data};
}