import React from 'react'

export const Biography = ({ title, imageUrl }) => {
    return (
        <div className='container biography'>
            <div className='banner'>
                <img src={imageUrl} alt='about us' className='animated-image' />
            </div>

            <div className='banner'>
                <p>Biography</p>
                <h3>Who we are</h3>
                <p>
                    Welcome to ABC Medical Care Institute – Your Partner in Wellness At ABC Medical Care Institute, we’re committed to providing exceptional care tailored to your unique health needs. Our team of experienced doctors, nurses, and healthcare professionals is dedicated to promoting your well-being with compassion and expertise.
                </p>
                <p>
                    Welcome to ABC Medical Care Institute – Your Partner in Wellness At ABC Medical Care Institute, we’re committed to providing exceptional care tailored to your unique health needs. Our team of experienced doctors, nurses, and healthcare professionals is dedicated to promoting your well-being with compassion and expertise.
                </p>
                <p>
                    Welcome to ABC Medical Care Institute – Your Partner in Wellness At ABC Medical Care Institute, we’re committed to providing exceptional care tailored to your unique health needs. Our team of experienced doctors, nurses, and healthcare professionals is dedicated to promoting your well-being with compassion and expertise.
                </p>

            </div>

        </div>
    )
}
