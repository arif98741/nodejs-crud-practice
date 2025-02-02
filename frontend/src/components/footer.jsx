import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


const Footer = (e)=>{
    const hours = [
        {
            id: uuidv4(),
            day: "Monday",
            time: "9:00 AM - 11:00 PM",
        },
        {
            id: uuidv4(),
            day: "Tuesday",
            time: "12:00 PM - 12:00 AM",
        },
        {
            id: uuidv4(),
            day: "Wednesday",
            time: "10:00 AM - 10:00 PM",
        },
        {
            id: uuidv4(),
            day: "Thursday",
            time: "9:00 AM - 9:00 PM",
        },
        {
            id: uuidv4(),
            day: "Monday",
            time: "3:00 PM - 9:00 PM",
        },
        {
            id: uuidv4(),
            day: "Saturday",
            time: "9:00 AM - 3:00 PM",
        },
    ];
    return (
        <>
            <footer className='container'>
                <hr/>
                <div className='content'>
                    <div>
                        <img src="/logo.png" className="logo-img"/>
                    </div>
                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <Link to={`/`}>Home</Link>
                            <Link to={`/appointment`}>Appointment</Link>
                            <Link to={`/about`}>About</Link>
                        </ul>
                    </div>
                    <div>
                        <h4>Hours</h4>

                        <ul>
                            {hours.map((element) => (
                                <li key={element.id}>
                                    <span>{element.day}</span>
                                    <span>{element.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <div>
                            <FaPhone/>
                            <span>+880-28829295</span>
                        </div>
                        <div>
                            <MdEmail/>
                            <span>test@gmail.com</span>
                        </div>
                        <div>
                            <FaLocationArrow/>
                            <span>Bangladesh</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
