import React from 'react'
import Hero from '../components/Hero'
import Biography from './../components/Biography';

const AboutUs = () => {
    return (
        <>
            <Hero title={"Learn More ABout Us | Zeecare"} imageUrl={"/about.png"} />
            <Biography imageUrl={"/whoweare.png"} />
        </>
    )
}
export default AboutUs
