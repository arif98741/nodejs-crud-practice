import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './../pages/Home';
import AboutUs from './../pages/AboutUs';
import Register from './../pages/Register';
import Login from './../pages/Login';
import Appointment from './../pages/Appointment';
import Navbar from "../components/Navbar";
import { Context } from "./main";
import axios from "axios";
const App = () => {

  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser
  } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/patient/me`, { withCredentials: true })
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    }

    fetchUser();

  }, [isAuthenticated, setIsAuthenticated, setUser])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
