import { loginServices } from "../services/login.js";

export const loginController = async (req, res) => {
    const { status, message, token, role, department } = await loginServices(req.body);
    res.status(status).json({
        message,
        ...(token && { token }),
        ...(role && { role }),
        ...(department && { department })
    });
};
