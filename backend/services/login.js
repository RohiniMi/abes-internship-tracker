import StudentLogin from "../models/studentLogin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const loginServices = async (data) => {
    const { email, password } = data;
    let message = "";
    let status = 300;
    let token = null;

    try {
        const user = await StudentLogin.findOne({ email });
        if (!user) {
            message = "User not found";
            status = 404;
            return { message, status };
        }
        console.log("Comparing passwords...");
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Comparison result:", isMatch);
        if (!isMatch) {
            message = "Invalid password";
            status = 401;
            return { message, status };
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
                department: user.department || null
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        message = "Login successful";
        status = 200;
        console.log(message);

        return {
            message: "Login successful",
            status: 200,
            token,
            role: user.role,
            department: user.department || null
        };
    } catch (error) {
        console.error("Login error:", error);
        message = "Internal server error";
        status = 500;
        return { message, status };
    }
};
