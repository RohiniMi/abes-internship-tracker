import express from "express";
import dotenv from "dotenv";
import http from 'http';
import connectDB from "./config/db.js";
import Student from "./models/student.js";
import cors from "cors";
import { Server } from "socket.io";
import sendEmail from "./mailer.js";
import dashboardRoutes from "./routes/dashboard.js";
import notificationRoutes from "./routes/notification.js";
import loginRoutes from "./routes/login.js"
import upload from "./utils/multerConfig.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/messenger/user.js";
import messageRoutes from "./routes/messenger/message.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/dashboard", dashboardRoutes);
app.use("/department", notificationRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use('/messenger/users', userRoutes);
app.use('/messenger/messages', messageRoutes);
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
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New socket connected:", socket.id);

  socket.on("join", (userId) => {
    console.log("👤 User joined socket room:", userId);
    socket.join(userId);
  });

  socket.on("send-message", (msg) => {
    console.log(`📨 Message from ${msg.senderId} to ${msg.receiverId}: ${msg.content}`);
    io.to(msg.receiverId).emit("receive-message", msg); 
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});



server.listen(process.env.PORT, () => {
  console.log(`Server is running at http://172.16.48.192:${process.env.PORT}`);
});
