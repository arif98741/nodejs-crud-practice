import React from 'react'
import Hero from '../components/Hero.jsx'
import AppointForm from '../components/AppointForm.jsx'

const Appointment = () => {
    return (
        <div>
            <Hero title={"Schedule Your Appointment | Zeecare Medical College"} imageUrl={"/signin.png"} />
            <AppointForm />
        </div>
    )
}

export default Appointment;
