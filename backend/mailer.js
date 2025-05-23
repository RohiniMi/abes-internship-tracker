import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendEmail = (email,subject,body) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.pass
        }
    });
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_SENDER,
        subject: subject,
        text: body,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
export default sendEmail;