import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });
const Department = mongoose.model('Department', departmentSchema);
const Section = mongoose.model('Section',departmentSchema);
const Session = mongoose.model('Session',departmentSchema);
export default {Department,Section,Session};

