import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import logo from "../images/logo.png";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const images = [
        "https://picsum.photos/id/1015/600/300",
        "https://picsum.photos/id/1016/600/300",
        "https://picsum.photos/id/1018/600/300",
        "https://picsum.photos/id/1019/600/300"
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const role = localStorage.getItem("role") || sessionStorage.getItem("role");
        if (token && role) redirectUser(role);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const redirectUser = (role) => {
        switch (role) {
            case "admin":
            case "ccpd": navigate("/home"); break;
            case "hod": navigate("/hod-dashboard"); break;
            case "student": navigate("/internship"); break;
            default: alert("Unknown role. Contact admin.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (!email || !password) return alert("Please fill all fields.");

        try {
            console.log("Hi Inside api");

            const res = await axios.post("http://172.16.48.192:7890/login", data);
            console.log("Hi after api");
            alert(res.data.message);
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem("token", res.data.token);
            storage.setItem("role", res.data.role);
            storage.setItem("email", data.email);
            if (res.data.department) storage.setItem("department", res.data.department);
            redirectUser(res.data.role);
        } catch (error) {
            alert(error?.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="login-main">
            {/* LEFT: Login Form */}
            <div className="login-left">
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
                        <span className="toggle-password" onClick={() => setShowPassword(p => !p)}>
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>

                    <div className="remember-container">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            id="rememberMe"
                        />
                        <label htmlFor="rememberMe" className="remember-me">Remember Me</label>
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="login-right">
                <div className="slider-container">
                    <h2 className="slider-title">Explore with Us</h2>
                    <Slider {...sliderSettings}>
                        {images.map((img, index) => (
                            <div key={index}>
                                <img
                                    src={img}
                                    alt={`Slide ${index}`}
                                    className="slider-image"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Login;
