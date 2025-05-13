import React, { useState, useContext } from 'react';
import CurrencyFormatter from '../Utils/CurencyFormrter/CurrencyFormatter';
import CartContext from '../Store/CartContext';
import ProgressContext from '../Store/ProgressContext';
import "./OrderItem.css";
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
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user)._id : null;
  
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const totalCartPrice = cartCtx?.items?.reduce((totalNoOfItems, item) => {
    return totalNoOfItems + item?.discountedPrice * item?.quantity;
  }, 0) || 0;

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
    setOrderPlaced(false);
    cartCtx.removeCartItems();
  };

  const itemId = cartCtx.items.map((item) => ({
    cartItemIds: item._id,
  }));

  const validateForm = () => {
    if (!data.name || !data.email || !data.mobile || !data.address || !data.paymentMethod) {
      alert("Please fill all required fields");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    
    if (data.mobile.length < 10) {
      alert("Please enter a valid phone number");
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const orderData = {
        userId,
        itemId,
        quantity: cartCtx.items.map((item) => item.quantity),
        price: totalCartPrice * 100,
        ...data
      };
      
      if (data.paymentMethod === "cod") {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/place-cod-order`,
          orderData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          }
        );
        
        if (response.data.success) {
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
        }
      } 
      
      else if (data.paymentMethod === "razorpay") {
        const keyResponse = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-key`);
        const key = keyResponse.data.key;
        
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/place-order`,
          orderData,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          }
        );
        
        if (!response.data || !response.data.checkoutId) {
          throw new Error("Invalid response from server");
        }
        
        const options = {
          key: key,
          amount: response.data.data.price,
          currency: "INR",
          name: "ZestyZoom",
          description: "Food Delivery App",
          order_id: response.data.checkoutId,
          callback_url: `${import.meta.env.VITE_BACKEND_BASE_URL}/verify-order`,
          image: "http://localhost:5173/src/assets/images/logo.jpeg",
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
        };
        
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.success', function() {
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
        });
        
        razorpay.open();
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
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
              <button type="button" onClick={handleCheckOutClose}>Close</button>
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
              placeholder="Enter Your Name *"
              required
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email *"
              required
            />
            <input
              type="tel"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              placeholder="Enter Your Mobile Number *"
              required
            />
            <input
              type="textarea"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Address (House No, Building, Street, Area) *"
              required
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
              required
            />
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={handleChange}
              placeholder="Enter Your Country"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={data.postalCode}
              onChange={handleChange}
              placeholder="Enter Your Postal Code"
              required
            />
            <select 
              name="paymentMethod" 
              value={data.paymentMethod} 
              onChange={handleChange} 
              id="paymentMethod"
              required
            >
              <option value="">Select Payment Method *</option>
              <option value="razorpay">Razorpay</option>
              <option value="cod">Cash On Delivery</option>
            </select>
            <button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        )
      )}
    </div>
  );
};

export default OrderItem;
