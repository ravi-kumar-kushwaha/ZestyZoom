import React, { useEffect, useState } from "react";
import "./UserOrder.css";
import axios from "axios";
import CurrencyFormatter from '../../Utils/CurencyFormrter/CurrencyFormatter';
const UserOrder = ({ showOrder, handleOrder }) => {
  const [orderData, setOrderData] = useState([]);

  // const auth = localStorage.getItem("user");
  // const user = auth ? JSON.parse(auth) : "";
  // const _id = user && user?._id ? user?._id : "";

  useEffect(() => {
    const fetchUserOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user-orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setOrderData(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Internal Server Error:", error);
      }
    };
    fetchUserOrder();
  }, []);
  return (
    showOrder && (
      <div>
        <div className="user-order-main-container">
          <div className="handle-order">
            <button onClick={handleOrder}>Close</button>
          </div>
          <div className="user-order-heading">
            <h1>Your Orders</h1>
          </div>
          <div className="user-order-items">
            {orderData.length > 0 ? (
              <>
                {orderData.map((item) => {
                  return (
                    <div className="user-order-item" key={item._id}>
                      <div className="user-order-item-details">
                        <h1>Order By : {item.name}</h1>
                        <p>Total Price : {CurrencyFormatter.format(item.price/100)}</p>
                        <p>Email : {item.email}</p>
                        <p>Mobile No: {item.mobile}</p>
                        <p>Address : {item.address}</p>
                        <p>Street: {item.street}</p>
                        <p>Landmark: {item.landmark}</p>
                        <p>State: {item.state}</p>
                        <p>Country: {item.country}</p>
                        <p>Postal Code: {item.postalCode}</p>
                        <p>Status : {item.status}</p>
                        <p>Payment Method : {item.paymentMethod}</p>
                        <p>
                          Date: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="user-order-item-items">
                        {item.itemId.map((orderData) => {
                          return (
                            <div
                              key={orderData}
                              className="user-order-item-item"
                            >
                              <img
                                src={orderData.image}
                                alt={orderData.name}
                                width="80"
                              />
                              <p>
                                <strong>{orderData.name}</strong>
                              </p>
                              <p>{orderData.description}</p>
                              <p>Category: {orderData.category}</p>
                              <p>Subcategory:{orderData.category2}</p>
                              <p>Price:{CurrencyFormatter.format(orderData.price)}</p>
                              <p>Offer Price:{CurrencyFormatter.format(orderData.discountedPrice)}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="no-order-found">
                  <h1>No Orders Found</h1>
                  <p>Place Some Orders To See Here </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserOrder;
