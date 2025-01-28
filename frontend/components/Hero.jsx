import React from 'react'

export const Hero = ({ title, imageUrl }) => {
    return (
        <div className='hero container'>
            <div className='banner'>
                <h1>{title}</h1>
                <p>Welcome to ABC Medical Care Institute – Your Partner in Wellness
                    At ABC Medical Care Institute, we’re committed to providing exceptional care tailored to your unique health needs. Our team of experienced doctors, nurses, and healthcare professionals is dedicated to promoting your well-being with compassion and expertise.</p>
            </div>

            <div className='banner'>
                <img src={imageUrl} alt='hero' className='animated-image' />
                <span>
                    <img src="/Vector.png" alt='hero' className='animated-image' />
                </span>
            </div>
        </div>
    )
}
