import React, { useState } from 'react'
import CurrencyFormatter from '../Utils/CurencyFormrter/CurrencyFormatter';
import { useContext } from 'react';
import CartContext from '../Store/CartContext';
import ProgressContext from '../Store/ProgressContext';
import "./OrderItem.css"
import axios from 'axios';
const OrderItem = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    street: "",
    landmark: "",
    state: "",
    country: "",
    postalCode: "",
    paymentMethod: ""
  });
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user)._id : null;
  // if (!userId) {
  //   console.log("User not found");
  // }
  //tracking order placed  
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const totalCartPrice = cartCtx.items.reduce((totalNoOfItems, item) => {
    return totalNoOfItems + item.discountedPrice * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckOutClose = () => {
    progressCtx.hideCheckout();
  };

  const handleFinishOrder = () => {
    progressCtx.hideCheckout();
    setOrderPlaced(false); // Hide the success message
    cartCtx.removeCartItems();
  };

  const itemId = cartCtx.items.map((item) => ({
    cartItemIds: item._id,
    // quantity: item.quantity
  }));

  // console.log("itemId:", itemId);
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!data.paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    const getKey = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-key`);
    const key = getKey.data.key;
    // console.log("key", key);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/place-order`,
        {
          userId,
          itemId,
          quantity: cartCtx.items.map((item) => item.quantity),
          price: totalCartPrice * 100,
          ...data
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        }
      );
      console.log(response.data.checkoutId);
      const options = {
        key: key,
        amount: response.data.data.price,
        currency: "INR",
        name: "ZestyZoom",
        description: "Food Delivery App",
        // order_id: response.data.data.id,
        // checkoutId: response.data.checkoutId,
        // order_QQi39HFK3xucBN
        order_id: response.data.checkoutId,
        callback_url: `${import.meta.env.VITE_BACKEND_BASE_URL}/verify-order`,
        Image:"http://localhost:5173/src/assets/images/logo.jpeg",
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.mobile,
        },
        notes: {
          address: data.address,
          street: data.street,
          landmark: data.landmark,
        },
        theme: {
          color: "#3399cc",
          hide_topbar: false,
        },
      }
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      if (response.data.success) {
        alert("Order Placed Successfully");
        console.log("response", response);
        setOrderPlaced(true);
        setData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          street: "",
          landmark: "",
          state: "",
          country: "",
          postalCode: "",
          paymentMethod: ""
        });
        cartCtx.removeCartItems();
      } else {
        console.log("error");
      }
    } catch (error) {
      alert("Internal Server Error:" + error.message);
    }
  };

  return (
    <div className="order-item">
      {orderPlaced ? (
        <div className="success-message">
          <h2>Success</h2>
          <p>Your Order was Placed Successfully.</p>
          <p>
            We will get back to you with more details about your order via
            email or phone in the next few minutes.
          </p>
          <button onClick={handleFinishOrder}>Okay</button>
        </div>
      ) : (
        progressCtx.progress === "checkout" && (
          <form onSubmit={handlePlaceOrder}>
            <div className="close">
              <button onClick={handleCheckOutClose}>Close</button>
            </div>
            <div className="checkout">
              <h1>Place Your Order</h1>
            </div>
            <div className="total-cart-price">
              <p>
                Total Cart Price: {CurrencyFormatter.format(totalCartPrice)}
              </p>
            </div>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
            <input
              type="tel"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              placeholder="Enter Your Mobile Number"
            />
            <input
              type="textarea"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Address (House No, Building, Street, Area)*"
            />
            <input
              type="text"
              name="street"
              value={data.street}
              onChange={handleChange}
              placeholder="Locality/Town"
            />
            <input
              type="text"
              name="landmark"
              value={data.landmark}
              onChange={handleChange}
              placeholder="Enter The Landmark"
            />
            <input
              type="text"
              name="state"
              value={data.state}
              onChange={handleChange}
              placeholder="Enter Your State"
            />
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={handleChange}
              placeholder="Enter Your Country"
            />
            <input
              type="text"
              name="postalCode"
              value={data.postalCode}
              onChange={handleChange}
              placeholder="Enter Your Postal Code"
            />
            <select name="paymentMethod" value={data.paymentMethod} onChange={handleChange} id="paymentMethod">
              <option value="">Select Payment Method</option>
              <option value="razorpay">Razorpay</option>
              <option value="cod">Cash On Delivery</option>
            </select>
            <button type="submit">Place Order</button>
          </form>
        )
      )}
    </div>
  );
};
export default OrderItem;










