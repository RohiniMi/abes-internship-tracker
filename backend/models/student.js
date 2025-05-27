import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
    rollno: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    companyname: { type: String, required: true },
    type: { type: String, required: true },
    doj: { type: String, required: true },
    doc: { type: String, required: true },
    internshipLetter: { type: String, required: true },
    stipend : {type:Number}
})
const Student = mongoose.model("stuColl", StudentSchema);
const StudentRaw = mongoose.model("stuCollRaw", StudentSchema);
export default {Student,StudentRaw};