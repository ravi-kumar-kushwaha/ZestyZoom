import React from 'react'
import logo from '../../../assets/images/logo.jpeg'
import './AboutNav.css'
import background from '../../../assets/images/aboutus1.png'
import { Link } from 'react-router-dom'
const AboutNav = () => {
    return (
        <div className='about-nav'>
            <div className="about-background">
               <img src={background} alt="" />
            </div>
            <div className="about-logo">
                <div className='about-nav-container'>
                    <img  src={logo} alt="" />
                    <h1>ZestyZoom</h1>
                </div>
                <div className="about-nav-links">
                    <ul>
                        <li><Link to="/" className='home-link'>Home</Link></li>
                        <li>Who We Are</li>
                        <li>Work With Us</li>
                    </ul>
                </div>
            </div>
            <div className="about-header">
                <h1>
                Better food for more people
                </h1>
                <p>scroll for more </p>
            </div>
        </div>
    )
}

export default AboutNav




