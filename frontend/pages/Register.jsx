import React, { useContext, useState } from 'react';
import { Context } from '../src/main'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Register = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [nid, setNid] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            !firstName ||
            !lastName ||
            !email ||
            !dob ||
            !gender ||
            !phone ||
            !nid ||
            !password
        ) {
            toast.error("All fields are required");
        } else {
            try {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/user/patient/register`,
                    { firstName, lastName, email, dob, gender, phone, nid, password, role: "Patient" },
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

                console.log(error.response);

                toast.error(error.response.data.message);

            }
        }
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }
    return (
        <div className='container form-component register-form'>
            <h2>Sign Up Form</h2>
            <p>Please Sign Up to Continue</p>
            <p>lsdjflksd flkslfkjlsdjflj sdflksdj lksdjflkjsdlkfjslkjfljsdlfkj</p>
            <form onSubmit={handleRegister}>

                <div>
                    <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div>
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='number' placeholder='Phone numer' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div>
                    <input type='number' placeholder='NID ' value={nid} onChange={(e) => setNid(e.target.value)} />
                    <input type='date' placeholder='Date of birth' value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>

                <div>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type='password' placeholder='Password ' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div style={{
                    gap: "10px",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                }}>

                    <p>Already Registered ?</p>
                    <Link to={"/login"}
                        style={{ textDecoration: "none", alignItems: "center" }}>
                        Register Now
                    </Link>
                </div>
                <div style={{ textDecoration: "none", alignItems: "center" }}>
                    <button type="submit">Register</button>
                </div>

            </form>
        </div>
    )
}


export default Register;