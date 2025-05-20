import Student from "../models/student.js";
export const findDepartmentWiseNotification = async (dept) => {
    let status = 500;
    let data = [];
    try {
        data = await Student.StudentRaw.find({ "branch": dept });
        if (data.length > 0) status = 200;
        console.log(data);
        
        return { status, data };
    } catch (error) {
        console.error("Error fetching student data:", error);
        return { status, data };
    }
}