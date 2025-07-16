import mongoose from 'mongoose';
const studentLoginSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'ccpd', 'hod', 'student'],
        default: 'student'
    },
    department: {
        type: String,
        required: function () { return this.role === 'hod'; } // Only required for HOD
    }
});


const StudentLogin = mongoose.model("studentLogin", studentLoginSchema);
export default StudentLogin;