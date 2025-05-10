import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./UserInfo.css"
import { Link } from 'react-router-dom';

const UserInfo = ({showUserInfo,handleUserInfo,handleEditProfile}) => {
    const auth = localStorage.getItem("user");
    const user = auth ? JSON.parse(auth) : "";
    const _id = user && user?._id ? user?._id : "";
    // console.log("id:",_id);
  const [data,setData] = useState({});
  useEffect(()=>{
      const getSingleUser = async()=>{
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/single-user/${_id}`,{
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          // console.log("Single User:",response);
          // console.log("Single User:",response.data.data);
          if(response.data.success){
            setData(response.data.data);
          }else{
            alert(response.data.message)
          }
        } catch (error) {
          console.error("Internal Server Error:",error);
        }
      }
      getSingleUser();
  },[_id])
  return (
    // <div className='user-info-main-container'>
    // {
   showUserInfo &&
    <div className='list-users-container' id='profile-info'>
      <div className='handle-profile-info'>
        <button onClick={handleUserInfo}>Close</button>
      </div>
      <div className="all-zestyzoomUsers">
        {
          data ?
                <>
              <div className="user-card" key={data._id}>
                <div className='cover-image'>
                <img src={data.coverImage} alt="" />
                </div>
                <div className='avatar-image'>
                <img src={data.avatar} alt="" />
                </div>
                <h2>User Id : {data._id}</h2>
                <h2>Name : {data.name}</h2>
                <p>Email : {data.email}</p>
                <p>Phone : {data.phone}</p>
                <p>Address : {data.address}</p>
                <p>City : {data.city}</p>
                <p>State : {data.state}</p>
                <p>Country : {data.country}</p>
                <p>Zip-Code : {data.postalCode}</p>
                <p>Role : {data.role}</p>
                <p>CreatedAt : {new Date(data.createdAt).toLocaleString()}</p>
                <div className='user-card-btn'>
                <div className="admin-dashboard-profiles" id='admin-dashboard-profiles-btn'>
                {/* <Link to={`/edit-profiler/${data._id}`}> */}
                   <button onClick={handleEditProfile}>Edit</button>
                   {/* </Link> */}
                    </div>
                <button>Delete</button>
              </div>
              </div>
              </>  
            :<>
            <div className="no-user-found">
                <h1>No User Found</h1>
            </div>
            </>
          }
      </div>
      </div>
// }
//     </div>
  )
}



export default UserInfo




