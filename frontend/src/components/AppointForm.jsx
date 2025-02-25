import React, {useEffect, useState} from 'react'
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AppointForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [nid, setNid] = useState("");
    const [appointmentDate, setAppointmentDate] = useState('');
    const [department, setDepartment] = useState('');
    const [doctorFirstName, setDoctorFirstName] = useState('');
    const [doctorLastName, setDoctorLastName] = useState('');
    const [address, setAddress] = useState('');
    const [hasVisited, setHasVisited] = useState('');

    const departmentsArray = [
        "Pediatric",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "ENT",
    ];

    const naviateTo = useNavigate();
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const fetchDoctor = async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/doctors`, {withCredentials: true});
            setDoctors(data.data);
        }
        fetchDoctor().then(r => {
            console.log('doctor fetched')
        })
    }, []);

    const handleAppointment = async (e) => {
        e.preventDefault();
        try {
            const hasVisitedBool = Boolean(hasVisited);
            const {data} = await axios.post(
                `${import.meta.env.VITE_API_URL}/appointment/post`,
                {
                    firstName,
                    lastName,
                    email,
                    dob,
                    gender,
                    phone,
                    nid,
                    appointment_date: appointmentDate,
                    department,
                    doctor_firstName: doctorFirstName,
                    doctor_lastName: doctorLastName,
                    address,
                    hasVisited: hasVisitedBool
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            toast.success(data.message);
            naviateTo("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    return (
        <>
            <div className='container form-component register-form'>
                <h2>Appointment Form</h2>
                <p>Please Fillup form to Get Appointment</p>
                <form onSubmit={handleAppointment}>

                    <div>
                        <input type='text' placeholder='First Name' value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>
                        <input type='text' placeholder='Last Name' value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    <div>
                        <input type='text' placeholder='Email' value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <input type='number' placeholder='Phone numer' value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>

                    <div>
                        <input type='number' placeholder='NID ' value={nid} onChange={(e) => setNid(e.target.value)}/>
                        <input type='date' placeholder='Date of birth' value={dob}
                               onChange={(e) => setDob(e.target.value)}/>
                    </div>

                    <div>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <input type='date' placeholder='Appointment Date' value={appointmentDate}
                               onChange={(e) => setAppointmentDate(e.target.value)}/>
                    </div>
                    <div>
                        <select name={department} onChange={(e) => {
                            setDepartment(e.target.value);
                            setDoctorFirstName('');
                            setDoctorLastName('');
                        }}>
                            <option value="">Select Department</option>
                            {
                                departmentsArray.sort().map((depart, index) => {
                                    return (
                                        <option value={depart} key={index}>
                                            {depart}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <select
                            value={`${doctorFirstName} ${doctorLastName}`}
                            onChange={(e) => {
                                const [firstName, lastName] = e.target.value.split(" ");
                                setDoctorFirstName(firstName);
                                setDoctorLastName(lastName);
                            }}
                            disabled={!department}
                        >
                            <option value="">Select Doctor</option>
                            {doctors
                                .filter((doctor) => doctor.doctorDepartment === department)
                                .map((doctor, index) => (
                                    <option
                                        value={`${doctor.firstName} ${doctor.lastName}`}
                                        key={index}
                                    >
                                        {doctor.firstName} {doctor.lastName}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>

                        <textarea rows="3" placeholder={`Enter address here`} value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }}></textarea>
                    </div>


                    <div style={{
                        gap: "10px",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                    }}>

                        <p>Have you visited before ?</p>
                        <input type="checkbox" checked={hasVisited} onChange={(e) => {
                            setHasVisited(e.target.checked)
                        }} style={{flex: "none", width: '25px'}}/>
                    </div>
                    <div style={{justifyContent: "center", alignItems: "center"}}>
                        <button type="submit">Get Appointment</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AppointForm
