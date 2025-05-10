import React from 'react'
import logo from '../../assets/images/logo.jpeg'
import Footer from '../Footer/Footer'
import './EmergencyContact.css'
import { Link } from 'react-router-dom'
const EmergencyContact = () => {
    return (
        <div className='emergency-contact-container'>
            <div className="emergency-navbar">
                <div className="emergency-logo">
                    <img src={logo} alt="" />
                    <h1>ZestyZoom</h1>
                </div>
                <div className="emergency-order">
                    <button><Link to="/" className='link-order'>Order Food</Link></button>
                </div>
            </div>
            <div className="emergency-header">
                <h1>
                    Report an Accident or Emergency
                </h1>
            </div>
            <div className="contact-details" >
                <div className="contact-form" >
                    <form >
                        <select name="" id="" >
                            <option value="">How Can We Help You?</option>
                            <option value="1">Report an Accident.</option>
                            <option value="2">Report an Incident</option>
                        </select>
                        <div className="warning">
                            <p>At ZestyZoom, we have zero tolerance for rash behaviour from our delivery partners.
                                We request you to share any information/evidence available for us to take action against such behaviour.
                                If you have been involved in a serious incident involving one of our delivery partners,
                                please fill the form below.
                            </p>
                        </div>
                        <input type="text" placeholder='Full Name' />
                        <input type="text" placeholder='Email Address' />
                        <input type="text" placeholder='Mobile Number (optional)' />
                        <textarea name="" id="" cols="30" rows="10" placeholder='Type text'></textarea>
                        <div className="warning">
                            <h3>Please use this form only for accident or abuse related emergency situations. For order or other general queries <span><Link to="/contact" className='link'>contact us here.</Link></span></h3>
                        </div>
                        <button type='submit'>Send message</button>
                    </form>
                </div>
                <div className="right-contact-details">
                    <div className="safety-emergency" id='safety-emergency'>
                        <h1>Disclaimer</h1>
                        <p>Please use this page to report a serious incident or accident only. For order related queries, please use our chat support.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EmergencyContact
