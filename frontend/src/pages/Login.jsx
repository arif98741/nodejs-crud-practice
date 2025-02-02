import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/user/login`,
                { email, password, confirmPassword, role: "Patient" },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(res => {
                toast.success(res.data.message);
                setEmail("");
                setPassword("");
                setIsAuthenticated(true);

                navigateTo("/");
            })
        } catch (error) {

            toast.error(error.response.data.message);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className='container form-component login-form'>
            <h2>Sign In</h2>
            <p>Please sign in</p>
            <p>Lorem ipsum dolor</p>
            <form onSubmit={handleLogin}>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter confirm password' />


                <div style={{
                    gap: "10px",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                }}>

                    <p>Not Registered ?</p>
                    <Link to={"/register"}
                        style={{ textDecoration: "none", alignItems: "center" }}>
                        Register Now
                    </Link>
                </div>
                <div style={{ textDecoration: "none", alignItems: "center" }}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
