import mongoose, { mongo } from "mongoose";
const StudentSchema = new mongoose.Schema({

    rollno: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    semester: { type: String, required: true },
    branch: { type: String, required: true },
    companyname: { type: String, required: true },
    type: { type: String, required: true },
    doj: { type: String, required: true },
    doc: { type: String, required: true },
    internshipLetter: { type: String, required: true },

})
const Student = mongoose.model("stuColl", StudentSchema);
export default Student;