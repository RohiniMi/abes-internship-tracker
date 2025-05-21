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
export const saveInternship = async (id) => {
    let status = 500;
    let message = "Unsuccessful";
    try {
        const data = await Student.StudentRaw.findById(id); 
        if (data) {
            await Student.Student.create(data.toObject()); 
            await Student.StudentRaw.findByIdAndDelete(id);
            status = 200;
            message = "Successful";
        }
        return { status, message };
    } catch (error) {
        console.error("Error fetching student data:", error);
        return { status, message };
    }
}
