import React from 'react'
import Header from '../Header/Header'
import Hero from '../Hero/Hero'
import FoodItem from '../FoodItems/FoodItem'
import Cart from '../CartPages/Cart'
import OrderItem from '../PlaceOrder/OrderItem'
import SignIn from '../Pages/SignIn/SignIn'
import SignUp from '../Pages/Signup/SignUp'
import Footer from '../Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import About from '../About/About'
import Contact from '../ContactUs_pages/Contact'
import Profile from '../UserProfile/Profile'
import { useState } from 'react'
import UserInfo from '../UserProfilePages/UserInfo/UserInfo'
import EditUserProfile from '../UserProfilePages/UpdateUserDetails/EditUserProfile'
import UserOrder from '../UserProfilePages/UserOrders/UserOrder'
const UserRoutes = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const handleProfile = () => {
      setShowProfile(!showProfile);
  }
  const handleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  }

  const handleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  }

  const handleOrder = () => {
    setShowOrder(!showOrder);
  }
  return (
    <div>
        <Header handleProfile={handleProfile}/>
      <Hero/>
      <Routes>
        <Route path="/" element={<FoodItem/>} />
        <Route path="/menu" element={<FoodItem/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {/* <Route path="/edit-profile/:id" element={<EditUserProfile showEditProfile={showEditProfile} handleEditProfile={handleEditProfile} />}/> */}
      </Routes>
      <Profile showProfile={showProfile} handleProfile={handleProfile} handleUserInfo={handleUserInfo} handleOrder={handleOrder}/>
      <UserInfo showUserInfo={showUserInfo} handleUserInfo={handleUserInfo}  handleEditProfile={handleEditProfile}/>
      <EditUserProfile showEditProfile={showEditProfile} handleEditProfile={handleEditProfile} />
      <UserOrder showOrder={showOrder} handleOrder={handleOrder} />
      <Cart/>
      <OrderItem/>
      <Footer/>
    </div>
  )
}

export default UserRoutes
