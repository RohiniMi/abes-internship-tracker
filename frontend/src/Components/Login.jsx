import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from "../images/logo.png";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const role = localStorage.getItem("role") || sessionStorage.getItem("role");

        if (token && role) {
            redirectUser(role);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const redirectUser = (role) => {
        switch (role) {
            case "admin":
            case "ccpd":
                navigate("/home");
                break;
            case "hod":
                navigate("/hod-dashboard");
                break;
            case "student":
                navigate("/internship");
                break;
            default:
                alert("Unknown role. Contact admin.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (!email || !password) {
            alert("Please fill all the required fields before submitting.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:7890/login", data);

            alert(res.data.message);

            const storage = rememberMe ? localStorage : sessionStorage;

            storage.setItem("token", res.data.token);
            storage.setItem("role", res.data.role);
            localStorage.setItem("email", data.email);

            if (res.data.department) {
                storage.setItem("department", res.data.department);
            }

            redirectUser(res.data.role);

        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                alert(error.response.data.message || "Login failed.");
            } else {
                alert("Server is not responding.");
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="logo-wrapper">
                    <img src={logo} alt="Logo" className="login-logo" />
                </div>

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                    <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                </div>

                {/* <label className="remember-me">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember Me
                </label> */}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
