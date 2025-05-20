import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import Student from "./models/student.js"
import cors from "cors";
import sendEmail from "./mailer.js";
import dashboardRoutes from "./routes/dashboard.js";
import notificationRoutes from "./routes/notification.js";
 
const app = express();
dotenv.config();
app.use(cors());

connectDB();
app.use(express.json());
app.use("/dashboard",dashboardRoutes);
app.use("/notification",notificationRoutes);
app.post("/internship", async (req, res) => {
    console.log(req.body.data);
    try {
        const user = await Student.StudentRaw.create(req.body.data);
        if (user) {
            res.status(200).json({ "message": 'successful' });
        }
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
})
app.post("/support/email", (req, res) => {
    try {
        const { email, subject, body } = req.body;
        sendEmail(email, subject, body);
        res.status(200).json({ "message": "mail sent successfully." });
    }
    catch (error) {
        res.status(500).json({ "message": error.message })
    }
})
app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));
