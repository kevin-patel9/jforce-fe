import React, { useState } from "react";
import { registerApi } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password){
            setErrorMessage("Invalid confirm password");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
            return;
        }

        const response = await registerApi(userId, email, password);
        
        if (response?.success){
            navigate("/login");
        }else{
            setErrorMessage(response?.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 2000)
        }
    };

    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate("/login");
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ 
                    background: "lightgrey", gap: 16, padding: 30, display: "flex", flexDirection: "column", alignItems: "center" 
                }}>
                <p>Register</p>
                <input style={{ height: 26, padding: 2 }}  
                    onChange={(e) => setUserId(e.currentTarget.value)} 
                    name="userId" 
                    type="text" 
                    placeholder="Username"
                />
                <input style={{ height: 26, padding: 2 }}  
                    onChange={(e) => setEmail(e.currentTarget.value)} 
                    name="email" 
                    type="email" 
                    placeholder="Email"
                />
                <input style={{ height: 26, padding: 2 }} 
                    type="password" 
                    onChange={(e) => setPassword(e.currentTarget.value)} 
                    name="password" 
                    placeholder="Password"
                />
                <input style={{ height: 26, padding: 2 }}  
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)} 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password"
                />
                <button 
                    style={{ width: "86%", height: 26, background: "gray", cursor: "pointer" }}
                    onClick={handleRegister}>Sign Up</button>
                <p>Already have an account ? 
                    <span 
                        style={{ cursor: "pointer", color: "blue" }} 
                        onClick={handleNavigateToLogin}>
                            Login
                    </span>
                </p>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Register;
