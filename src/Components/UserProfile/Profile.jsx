import React, { useState } from 'react'
import './Profile.css'
const Profile = ({ showProfile, handleProfile ,handleUserInfo,handleOrder}) => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
   
    return (
        showProfile && (
            <div className="user-profile-main">
                <div className='handle-profile'>
                    <button onClick={handleProfile}>X</button>
                </div>
                {user ? (
                    <>
                    <div className="user-profile">
                        <div className='user-profile-detail'>
                            <div className='user-profile-avatar'>
                                <img src={user.avatar} alt="" />
                            </div>
                            <div className='user-profile-info'>
                                <h1>HI, {user.name.toUpperCase()}</h1>
                                <p>{user.email}</p>
                                <p>+91 - {user.phone}</p>
                                <p>Welcome back</p>
                            </div>
                        </div>
                        {
                            user && (user?.role === 'admin' || user?.role === 'partner') ?
                                <div className="admin-dashboard-profile">
                                    <button onClick={() => { window.location.href = 'https://zestyzoom.onrender.com/admin' }}>Go to Dashboard</button>
                                </div>
                                : null
                        }
                    </div>
                    <div className="admin-dashboard-profiles">
                        <button onClick={handleUserInfo}>Your Profile</button>
                    </div>
                    <div className="admin-dashboard-profiles">
                        <button onClick={handleOrder}>Your Orders</button>
                    </div>
                    <div className="admin-dashboard-profiles">
                        <button>Setting</button>
                    </div>
                    <div className="admin-dashboard-profiles">
                        <button>Reset Password</button>
                    </div>
                    </>
                ) : (
                    <div>
                        <h1>Welcome! Please sign in to view your profile.</h1>
                    </div>
                )
                }
            </div>
        )
    )
}

export default Profile


