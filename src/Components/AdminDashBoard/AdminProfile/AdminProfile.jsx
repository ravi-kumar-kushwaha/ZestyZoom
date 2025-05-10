import React from 'react'
import CurrencyFormatter from '../../Utils/CurencyFormrter/CurrencyFormatter';
import "./AdminProfile.css"
const AdminProfile = () => {
    const auth = localStorage.getItem("user");
    const user = JSON.parse(auth);
    return (
        <div className='admin-profile-main'>
            <div className="admin-profile">
                <h1>Profile Details</h1>
            </div>
            <div className="profile-details">
                <img src={user.avatar} alt="" />
                <div className="profile-details-info">
                    <h2>Name : {user.name}</h2>
                    <p>UserId: {user._id}</p>
                    <p>Email : {user.email}</p>
                    <p>Mobile No : {user.phone}</p>
                    <p>Address : {user.address}</p>
                    <p>City : {user.city}</p>
                    <p>State : {user.state}</p>
                    <p>Country : {user.country}</p>
                    <p>Postal Code : {user.postalCode}</p>
                    <div>
                        CartItems:
                        {user.cartItems?.length > 0 ? (
                            user.cartItems.map((item) => {
                                return (
                                    <div className="cart-item" key={item._id}>
                                        <img src={item.image} alt={item.name} />
                                        <h2>{item.name}</h2>
                                        <p>{item.description}</p>
                                        <p className="discount">Flat {item.discountPercentage}% Off</p>
                                        <div className="prices">
                                            <span>{CurrencyFormatter.format(item.price)}</span>
                                            <span className="discounted-price">
                                                {CurrencyFormatter.format(item.discountedPrice)}
                                            </span>
                                            <span>Price: {CurrencyFormatter.format(item.discountedPrice * item.quantity)}</span>
                                        </div>
                                        <div className="add-remove-btn">
                                            <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No items in the cart</p>
                        )}
                    </div>

                    <p>Role : {user.role}</p>
                    <p>CreatedAt : {new Date(user.createdAt).toDateString()}</p>
                    <p>UpdatedAt : {new Date(user.updatedAt).toDateString()}</p>

                </div>
            </div>
        </div>
    )
}

export default AdminProfile
