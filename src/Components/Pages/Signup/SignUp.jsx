import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    coverImage: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    role: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowpass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPass = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === 'file') {
      setData({ ...data, [name]: files[0] });
    } else {
      setData((prevData) => ({
        ...prevData, [name]: value
      }));
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return
    }
    if (data.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return
    }
   
    if (!data.name || !data.email
      || !data.phone || !data.avatar
      || !data.coverImage || !data.address
      || !data.city || !data.state
      || !data.country || !data.postalCode
      || !data.role || !data.password
      || !data.confirmPassword
    ) {
      alert("Please fill in all required fields");
      return
    }
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("avatar", data.avatar);
      formData.append("coverImage", data.coverImage);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("country", data.country);
      formData.append("postalCode", data.postalCode);
      formData.append("role", data.role);
      formData.append("password", data.password);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        alert(response.data.message);
        setData({
          name: "",
          email: "",
          phone: "",
          avatar: "",
          coverImage: "",
          address: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          role: "",
          password: "",
          confirmPassword: ""
        })
        window.location.href = "/";
      } else {
        alert("Something went wrong while signing up:", response.data.message);
      }
    } catch (error) {
      alert("Internal Server Error:", +error.message);
    }
  }
  return (
    <div className='signup-form-container'>
    <div className='signup-container'>
      <div className="signup-heading">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input type="text"
            name='name'
            onChange={handleChange}
            value={data.name}
            placeholder='Name'
          />
        </div>
        <div className="form-input">
          <input type="email"
            onChange={handleChange}
            name='email'
            value={data.email}
            placeholder='Email'
          />
        </div>
        <div className="form-input">
          <input type="number"
            onChange={handleChange}
            name='phone'
            value={data.phone}
            placeholder='Phone'
          />
        </div>
        <p>Upload Your Avatar Image</p>
        <div className="form-input">
          <input type="file"
            onChange={handleChange}
            name='avatar'
            placeholder='Upload Your Avatar Image'
          />
        </div>
        <p>Upload Your Cover Image</p>
        <div className="form-input">
          <input type="file"
            onChange={handleChange}
            name='coverImage'
            placeholder="Upload Your Cover Image"
          />
        </div>
        <div className="form-input">
          <input type="text"
            onChange={handleChange}
            name='address'
            value={data.address}
            placeholder="Address"
          />
        </div>
        <div className="form-input">
          <input type="text"
            onChange={handleChange}
            name='city'
            value={data.city}
            placeholder='City'
          />
        </div>
        <div className="form-input">
          <input type="text"
            onChange={handleChange}
            name='state'
            value={data.state}
            placeholder='State'
          />
        </div>
        <div className="form-input">
          <input type="text"
            onChange={handleChange}
            name='country'
            value={data.country}
            placeholder='Country'
          />
        </div>
        <div className="form-input">
          <input type="number"
            onChange={handleChange}
            name='postalCode'
            value={data.postalCode}
            placeholder='Postal Code'
          />
        </div>
        <p>Select Your Role</p>
        <div className="form-input">
          <select name="role" id="role"
            onChange={handleChange}
            value={data.role}
          >
            <option value="" disabled> Select Role</option>
            <option value="user">user</option>
            <option value="partner">partner</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="form-input">
          <input type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name='password'
            value={data.password}
            placeholder='Password'
          />
          <button type='button'
            className='show-hide-btn'
            onClick={handleShowpass}>
            {showPassword ? "hide" : "show"}
          </button>
        </div>
        <div className="form-input">
          <input type={showConfirmPassword ? "text" : "password"}
            onChange={handleChange}
            name='confirmPassword'
            value={data.confirmPassword}
            placeholder='Confirm Password'
          />
          <button type='button'
            className='show-hide-btn'
            onClick={handleShowConfirmPass}
          >{showConfirmPassword ? "hide" : "show"}
          </button>
        </div>
        <button className='signup-btn'>Sign Up</button>
        <div className="signin-link">
          <p>Already have an account?<span><Link to='/signin'> SignIn</Link></span></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default SignUp




