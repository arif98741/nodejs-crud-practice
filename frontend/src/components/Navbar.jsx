import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import HamburgerIcon from '../lib/HamburgerIcon.jsx';


const Navbar = () => {

    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/user/patient/logout`, {
            withCredentials: true,
        }).then(res => {
            toast.success(res.data.message)
            setIsAuthenticated(false);
        }).catch(err => {
            toast.error(err.response.data.message)
        });
    }

    const gotoLogin = async () => {
        navigateTo("/login")
    }

    return (
        <nav className='container'>
            <div className='logo'>
                <img src="/logo.png" className="logo-img"/>
            </div>

            <div className={show ? "navLinks showmenu" : "navLinks"}>

                <div className='links'>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/appointment"}>Appointment</Link>
                    <Link to={"/about"}>About Us</Link>
                </div>

                {
                    isAuthenticated ? (
                        <button onClick={handleLogout} className='logoutBtn btn'>Logout</button>)
                        :
                        (<button onClick={gotoLogin} className='logoutBtn btn'>Login</button>)
                }
            </div>
            <div className="hamburger" onClick={() => setShow(!show)}>
                <HamburgerIcon/>
            </div>
        </nav>
    )
}

export default Navbar;
