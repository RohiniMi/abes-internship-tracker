import React, { useState } from 'react';
const Login = () => {
    const initialData = {
        email: "",
        password: ""
    }
    const [data, setData] = useState(initialData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => {
            return { ...prev, [name]: value };
        });
    };
    const handleSubmit = async () => {
        const requiredFields = ["email","password"];
        const hasEmptyField = requiredFields.some(field => !data[field]);
        if (hasEmptyField) {
            alert("Please fill all the required fields before submitting.");
            return;
        }
        try { 
            const res = await axios.post("http://localhost:7890/login", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Data saved successfully", res.status);
            alert("Data has been sent successfully!");
            setData(initialData);
        } catch (error) {
            console.error("Error while sending data:", error);
            alert("There was an error sending your data.");
        }
    };

    return (
        <div>
            <form action="">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required value={data.email} onChange={handleChange} />

                <label htmlFor="passwsord">Password:</label>
                <input type="text" name="password" id="password" required value={data.password} onChange={handleChange} />

                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login;