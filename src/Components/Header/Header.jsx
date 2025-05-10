import React, { useContext, useState } from 'react'
import './Header.css'
import logo from '../../assets/images/logo.jpeg'
import CartContext from '../Store/CartContext'
import ProgressContext from '../Store/ProgressContext'
import { Link } from 'react-router-dom'
const Header = ({handleProfile}) => {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);
  const TotalCartItem = cartCtx.items.reduce((totalNoOfItems,item)=>{
    return totalNoOfItems + item.quantity
  },0);

  const handleShowCart = () => {
    progressCtx.showCart();
  }
  const auth = localStorage.getItem("user");
  const user = JSON.parse(auth);
  // const cartItems = JSON.parse(localStorage.getItem("cartItems"))|| [];
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    window.location.href = "/";
  }

  return (
    <header className='main-header'>
        <div className='logo'>
        <img src={logo} alt="" />
        <h1>ZestyZoom</h1>
        </div>
        <div className="main-pages">
            <Link to="/" className='homes-link'><p>Home</p></Link>
            <Link to="/menu" className='homes-link'><p>Menu</p></Link>
            <Link to="/about" className='homes-link'><p>About</p></Link>
            <Link to="/contact" className='homes-link'><p>Contact</p></Link>      
        </div>
        <nav className='main-nav'>
            <button onClick={handleShowCart}>Cart({TotalCartItem})</button>
        
            <img src={user?.avatar} alt="" onClick={handleProfile} />
            {
              token ? (
            <button onClick={handleLogOut}>LogOut</button>
            ):(
              <button onClick={() => window.location.href = "/signin"}>SignIn</button>     
            )
}
        </nav>
    </header>
    
  )
}

export default Header
