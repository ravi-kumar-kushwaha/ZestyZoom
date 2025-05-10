import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    const token = localStorage.getItem("token");
    const handleLogOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";   
    }
  return (
    <div className='admin-sidebar-inner'>
      <div className="user-admin">
      <img src={user.avatar} alt="" />
        <div className="user-admin-img">
        <h2>Hello.  <sub>{user.name}</sub> </h2>
        <p>Welcome Back To ZestyZoom Admin Dashboard.</p>
        </div>
      </div>
      <div className="admin-dashboard-links">
        <Link className='admin-dashboard-link' to="/">Back To Home</Link>
        <Link className='admin-dashboard-link' to="/admin/add-product">Add Product</Link>
        <Link className='admin-dashboard-link' to="/admin/list-product">List Product</Link>
        <Link className='admin-dashboard-link' to="/admin/list-order">List Order</Link>
        <Link className='admin-dashboard-link' to="/admin/list-users">List Users</Link>
        <Link className='admin-dashboard-link' to="/admin/list-reviews">List Reviews</Link>
        <Link className='admin-dashboard-link' to="/admin/analytics">Analytics</Link>
        <Link className='admin-dashboard-link' to="/admin/notifications">Notifications</Link>
        <Link className='admin-dashboard-link' to="/admin/profile">Profile</Link>
        <Link className='admin-dashboard-link' to="/admin/setting">Setting</Link>
        <Link className='admin-dashboard-link' onClick={handleLogOut} to="/admin/logout">Logout</Link>
      </div>
    </div>
  )
}

export default Sidebar
