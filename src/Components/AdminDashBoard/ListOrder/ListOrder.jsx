import axios from 'axios';
import React, { useEffect } from 'react'
import CurrencyFormatter from '../../Utils/CurencyFormrter/CurrencyFormatter';
import "./ListOrder.css"
import { Link } from 'react-router-dom';
const ListOrder = () => {
  const [order, setOrder] = React.useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/all-orders`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        });
        console.log(response);
        console.log("orderlist:", response.data.data);
        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          console.log("Something Went Wrong While fetching all orders!");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrder();
  }, [])

  console.log("order", order);
  
  return (
    <div className='list-order-container'>
      <div className='fetch-order-list'>
        <h1>Total Order List : {order.length}</h1>
      </div>
      <div className='all-order-list-container'>
        {
          order ? (
            order.map((order) => {
              return (
                <div className="order-item-container" key={order._id}>
                  <h2>Order Id : {order._id}</h2>
                  <div className="order-items-details">
                {
                  order.itemId.map((item) => (
                    <div key={item._id} className="order-items-list">
                     <img src={item.image} alt="" />
                     <h2>{item.name}</h2>
                     <p>{item.description}</p>
                     <p className="discount">Flat {item.discountPercentage}% Off</p>
                     <p>Quantity : {item.quantity}</p>
                     <p>Category : {item.category}</p>
                     <p>SubCategory : {item.category2}</p>
                     <div className="prices">
                       <span>Price : {CurrencyFormatter.format(item.price)}</span>
                       <span className="discounted-price">Offer Price : {CurrencyFormatter.format(item.discountedPrice)}</span>
                     </div> 
                    </div>
                  ))
                }
              </div>
              <div className="order-user-details">
              <div className="order-address-details">
                  <h2>Order Address</h2>  
                  <p>Amount:{CurrencyFormatter.format((order.price)/100)}</p>
                  <p>Name : {order.name}</p>
                  <p>Email : {order.email}</p>
                  <p>Mobile No : {order.mobile}</p>
                  <p>Address : {order.address}</p>
                  <p>Street : {order.street}</p>
                  <p>Landmark : {order.landmark}</p>
                  <p>State : {order.state}</p>
                  <p>Country : {order.country}</p>
                  <p>Postal Code : {order.postalCode}</p>
                  <p>Payment Method : {order.paymentMethod}</p>
                  <p>Order Status : {order.status}</p>
                  <p>Order Date : {new Date(order.createdAt).toLocaleString()}</p>
                  {
                    order.status === "delivered" ? (
                      <p>Delivered Date : {new Date(order.updatedAt).toLocaleString()}</p>
                    ) : (
                      <p>Delivered Date : Not Delivered Yet Oreder in Transit.</p>
                    )
                  }
                  <div className="update-order-status">
                   <Link to={`/admin/edit-order/${order._id}`}><button>Update</button></Link>
                   <button>Cencel</button>
                  </div>
                  </div>
                  <div className="user-details">
                    <div className="user-info">
                      <h1>User Details</h1>
                    </div>
                    <div className="user-complete-details">
                      <img src={order.userId.avatar} alt="" />
                      <p>UserId : {order.userId._id}</p>
                      <p>Name : {order.userId.name}</p>
                      <p>Email : {order.userId.email}</p>
                      <p>Mobile No : {order.userId.phone}</p>
                      <p>Address : {order.userId.address}</p>
                      <p>City : {order.userId.city}</p>
                      <p>State : {order.userId.state}</p>
                      <p>Country : {order.userId.country}</p>
                      <p>Postal Code : {order.userId.postalCode}</p>
                    </div>
                  </div>
                  
                
                </div>
                </div>
              )
            })) :
            (
              <div>
                <h1>No Order Found</h1>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default ListOrder




