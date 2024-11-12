import React, { useState } from "react";
import { loginApi } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await loginApi(userId, password);

        if (response?.success){
            document.cookie = `token=${response.token}; path=/`;
            document.cookie = `isAdmin=${response.userDetail.isAdmin}; path=/`;

            navigate("/feedback");
        }else{
            setErrorMessage(response.message);
        }
    };

    const navigate = useNavigate();

    const handleNavigateToSignUp = () => {
        navigate("/");
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ 
                    background: "lightgrey", gap: 10, padding: 30, display: "flex", flexDirection: "column", alignItems: "center" 
                }}>
                <p>Login</p>
                <input 
                    style={{ height: 26, padding: 2 }}  
                    type="text"
                    onChange={(e) => setUserId(e.currentTarget.value)} name="userId" placeholder="Username"
                />
                <input 
                    style={{ height: 26, padding: 2 }}  
                    type="password"
                    onChange={(e) => setPassword(e.currentTarget.value)} name="password" placeholder="Password"
                />
                <button 
                    style={{ width: "86%", height: 26, background: "gray", cursor: "pointer" }}
                    onClick={handleLogin}>
                        Log In
                </button>
                <p>Don't have an account ? {" "}
                    <span style={{ cursor: "pointer", color: "blue" }} 
                        onClick={handleNavigateToSignUp}>
                            Sign Up
                    </span>
                </p>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
