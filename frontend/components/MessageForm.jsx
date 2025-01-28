import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export const MessageForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");


    const handleMessage = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:4000/api/v1/message/send",
                { firstName, lastName, phone, email, message },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(res => {
                toast.success(res.data.message);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setMessage("");
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='container form-component message-form'>
            <h2>Send Us A Message</h2>
            <form onSubmit={handleMessage}>
                <div>
                    <input type='text' placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input type='text' placeholder='Enter last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                </div>
                <div>
                    <input type='email' placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input type='text' placeholder='Enter phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <textarea rows={7} placeholder='Enter message' value={message}
                    onChange={(e) => setMessage(e.target.value)}>

                </textarea>

                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type='submit'>Send</button>
                </div>
            </form >
        </div >
    )
}
