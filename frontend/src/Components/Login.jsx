import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from "../images/logo.png"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const initialData = {
        email: "",
        password: ""
    };
    const [data, setData] = useState(initialData);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["email", "password"];
        const hasEmptyField = requiredFields.some(field => !data[field]);
        if (hasEmptyField) {
            alert("Please fill all the required fields before submitting.");
            return;
        }

        try {
            console.log("Sending login request with data:", data);
            const res = await axios.post("http://localhost:7890/login", data);

            console.log("Server response:", res);
            alert(res.data.message);
        } catch (error) {
            console.error("Axios error:", error);
            if (error.response) {
                console.error("Backend responded with:", error.response.data);
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
                <input type="email" name="email" id="email" value={data.email} onChange={handleChange} />

                <label htmlFor="password">Password:</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
