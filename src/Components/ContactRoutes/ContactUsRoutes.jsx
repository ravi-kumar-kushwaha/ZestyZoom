import React from 'react'
import Footer from '../Footer/Footer'
import ContactNav from '../ContactUs_pages/Contact_Navbar/ContactNav'
import ContactHeader from '../ContactUs_pages/Contact_Header/ContactHeader'

const ContactUsRoutes = () => {
  return (
    <div className='contact-us-container'>
      <h1>Contact Us</h1>
      <ContactNav/>
      <ContactHeader/>
      <Footer/>
    </div>
  )
}

export default ContactUsRoutes
