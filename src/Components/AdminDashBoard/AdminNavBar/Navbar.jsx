import React from 'react'
import './Navbar.css'
import logo from '../../../assets/images/logo.jpeg'
const Navbar = () => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
  return (
    <div className="admin-nav-container">
    <div className='admin-navbar'>
      <div className="nav-admin-logo">
        <img src={logo} alt="" />
        <h1>ZestyZoom</h1>
      </div>
      <div className="admin-search">
       <input type="text" placeholder='Search'/>
      </div>
      <div className="admin-name">
        <img src={user.avatar} alt="" />
        {/* <h1>{user.name}</h1> */}
      </div>
    </div>
    </div>
  )
}

export default Navbar
