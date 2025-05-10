import React from 'react'
import logo from '../../../assets/images/logo.jpeg'
import './ContactNav.css'
const ContactNav = () => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    const token = localStorage.getItem("token");
  return (
    <div className='contact-nav-container'>
      <div className="contact-logo">
        <img src={logo} alt="" />
        <h1>ZestyZoom</h1>
      </div>
      <div className="contact-search">
        <input type="text" placeholder='Search' />
      </div>
      <div className="contact-detail">
        {
            token  ?(
        <div className="contact-logout">
            <img src={user.avatar} alt="" />
            <button>Logout</button>
        </div>)
        :(
        <div className="contact-login">
            <button>Login</button>
        </div>)
}
        </div>   
    </div>
  )
}

export default ContactNav
