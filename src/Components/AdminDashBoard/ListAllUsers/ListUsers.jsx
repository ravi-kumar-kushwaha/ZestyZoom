import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./ListAllUsers.css"
import { Link } from 'react-router-dom';
const ListUsers = () => {
  const [data,setData] = useState([]);
  useEffect(()=>{
      const getAllUsers = async()=>{
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/all-users`,{
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          console.log("allusers:",response);
          if(response.data.success){
            setData(response.data.data);
          }else{
            alert(response.data.message)
          }
        } catch (error) {
          alert(error);
        }
      }
      getAllUsers();
  },[]);

  const handleDelete = async(id)=>{
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-user/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response);
      if(response.data.success){
        alert(response.data.message);
        window.location.reload();
      }else{
        alert(response.data.message);
      }
    } catch (error) {
      alert("Internal Server Error:",+error.message);
    } 
  }

  return (
    <div className='list-users-container'>
      <div className="users-count">
      <h1>All Users At ZestyZoom : {data.length}</h1>
      </div>
      <div className="all-zestyzoomUsers">
        {
          data.map((item)=>{
            return(
              <div className="user-card" key={item._id}>
                <div className='cover-image'>
                <img src={item.coverImage} alt="" />
                </div>
                <div className='avatar-image'>
                <img src={item.avatar} alt="" />
                </div>
                <h2>User Id : {item._id}</h2>
                <h2>Name : {item.name}</h2>
                <p>Email : {item.email}</p>
                <p>Phone : {item.phone}</p>
                <p>Address : {item.address}</p>
                <p>City : {item.city}</p>
                <p>State : {item.state}</p>
                <p>Country : {item.country}</p>
                <p>Zip-Code : {item.postalCode}</p>
                <p>Role : {item.role}</p>
                <p>CreatedAt : {new Date(item.createdAt).toLocaleString()}</p>
                <div className='user-card-btn'>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
              </div>
              
            )
          })
        }
      </div>
      </div>
  )
}

export default ListUsers
