import React from 'react'
import './ContactHeader.css'
import headerImage from '../../../assets/images/contact_us_image.avif'
import { Link } from 'react-router-dom'
const ContactHeader = () => {
  return (
    <div className='contact-header-container'>
      <div className="contact-header-image">
        <img src={headerImage} alt="" />
        <h1>We would love to hear from you!</h1>
      </div>
      <div className="contact-details">
        <div className="contact-form">
            <form >
                <select name="" id="" >
                    <option value="">How Can We Help You?</option>
                    <option value="1">I need help with my Zomato online order.</option>
                    <option value="2">I found incorrect/outdated information on a page.</option>
                    <option value="3">There is a photo/review that is bothering me and I would like to report it.</option>
                    <option value="4">The website/app are not working the way they should.</option>
                    <option value="">I would like to give feedback/suggestions.</option>
                    <option value="">Other.</option>
                </select>
                <input type="text" placeholder='Full Name' />
                <input type="text" placeholder='Email Address' />
                <input type="text" placeholder='Mobile Number (optional)' />
                <textarea name="" id="" cols="30" rows="10" placeholder='Type text'></textarea>
                <button type='submit'>Submit feedback</button>
            </form>
        </div>
        <div className="right-contact-details">
            <div className="safety-emergency">
                <h1>Report a Safety Emergency</h1>
                <p>We are committed to the safety of everyone using Zomato.</p>
                <button><Link to="/emergency" className='link'>Report here</Link></button>
            </div>
            <div className="support">
                <h1>Issue with your live order?</h1>
                <p>Click on the 'Support' or 'Online ordering help' section in your app to connect to our customer support team.</p>
            </div>
        </div>
      </div>
    </div>
    )
}   

export default ContactHeader
