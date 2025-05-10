import React, { useEffect, useState } from "react";
import "./EditUserProfile.css";
import axios from "axios";
const EditUserProfile = ({ showEditProfile, handleEditProfile }) => {
  const [newUserDetails, setNewUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    role: "",
  });
  const auth = localStorage.getItem("user");
  const user = auth ? JSON.parse(auth) : "";
  const _id = user && user?._id ? user?._id : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserDetails((preData) => ({
      ...preData,
      [name]: value,
    }));
  };
  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/single-user/${_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setNewUserDetails(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Internal Server Error:", error);
      }
    };
    getSingleUser();
  }, [_id]);

  const [availableRoles, setAvailableRoles] = useState([
    "admin",
    "user",
    "partner",
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/update-user-details/${_id}`,
        newUserDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        localStorage.setItem("user",
            JSON.stringify({ ...user, role: response.data.data.role })
          );
        window.location.href = "/";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Internal Server Error:", error);
    }
  };

  return (
    showEditProfile && (
      <div className="edit-user-profile" id="edit-user-profile-info">
        <div className="handle-edit-profile-info">
          <button onClick={handleEditProfile}>Close</button>
        </div>
        <div className="edit-user-profile-title">
          <h1>Edit User Profile</h1>
        </div>
        <div className="edit-user-profile-form">
          <form onSubmit={handleSubmit}>
            {[
              "name",
              "email",
              "phone",
              "address",
              "city",
              "state",
              "country",
              "postalCode",
            ].map((item) => {
              return (
                <div className="edit-user-profile-input" key={item}>
                  <input
                    type={item==="email" ? "email" : "text"}
                    id={item}
                    name={item}
                    value={newUserDetails[item]}
                    onChange={handleChange}
                    placeholder={`Enter your ${item}`}
                    required={item==="name"}
                  />
                </div>
              );
            })}
            <div className="edit-user-profile-input">
              <select
                id="role"
                name="role"
                value={newUserDetails.role}
                onChange={handleChange}
              >
                {availableRoles.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditUserProfile;
