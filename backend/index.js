// server.js or app.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Student from "./models/student.js";
import cors from "cors";
import sendEmail from "./mailer.js";
import dashboardRoutes from "./routes/dashboard.js";
import notificationRoutes from "./routes/notification.js";
import loginRoutes from "./routes/login.js"
import upload from "./utils/multerConfig.js"; // <== use this

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/dashboard", dashboardRoutes);
app.use("/department", notificationRoutes);
app.use("/login",loginRoutes);
app.post("/internship", upload.single("internshipLetter"), async (req, res) => {
  try {
    const formData = JSON.parse(req.body.data);
    if (req.file) formData.internshipLetter = `/uploads/${req.file.filename}`;
    const user = await Student.StudentRaw.create(formData);
    res.status(200).json({ message: "successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/support/email", (req, res) => {
  try {
    const { email, subject, body } = req.body;
    sendEmail(email, subject, body);
    res.status(200).json({ message: "mail sent successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
