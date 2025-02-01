import React from 'react'
import Hero from '../components/Hero'
import AppointForm from '../components/AppointForm'

const Appointment = () => {
    return (
        <div>
            <Hero title={"Schedule Your Appointment | Zeecare Medical College"} imageUrl={"/signin.png"} />
            <AppointForm />
        </div>
    )
}

export default Appointment;