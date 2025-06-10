import mongoose from 'mongoose';
const studentLoginSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String},
    mustChangePassword:{type:Boolean}
})

const StudentLogin = mongoose.model("studentLogin",studentLoginSchema);
export default StudentLogin;