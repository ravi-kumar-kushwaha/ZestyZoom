import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import "./SignIn.css"
import { Link } from 'react-router-dom';
const SignIn = () => {
    const [data,setData] = useState({
        email:"",
        password:""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (e) => {
      e.preventDefault();
      setShowPassword(!showPassword);
    }
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setData((preData)=>({
            ...preData,[name]:value
        }));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/signin`,data,{
                headers: {
                    "Content-Type": "application/json",
                  }
            });
            // console.log("data:",response.data.data);
            if(response.data.success){
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("user",JSON.stringify(response.data.data));
                // console.log("token:",response.data.token);
                alert(response.data.message);
                setData({
                    email:"",
                    password:""
                })
                window.location.href = "/";
            }else{
                console.log("something went wrong while trying to sihnin"+response.data.message)
            }
        } catch (error) {
          alert("Invalid email or password please enter valid credentials and try again");
            console.error("Internal Server error"+error.message);
        }
    }
    const [showSignin,setShowSignin] = useState(true);
    const handleHideSignin = ()=>{
      setShowSignin(!showSignin);
    }
  return (
    <div className='signin-container'>
     {showSignin &&(
    <div className='sign-in'>
    <button className='close-btn' onClick={handleHideSignin}>Close</button>
      <div className="sign-in-head">
        <h1>Sign In</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signin-emai">
        <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Email' />
        </div>
        <div className="signin-pass">
        <input type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleChange} placeholder='Password' />
        <button type='button' onClick={handleShowPassword}>{showPassword ? "Hide" : "Show"}</button>
        </div>
        <button type='submit' className='sign-in-btn'>Sign In</button>
        <div className="signup-link">
          <p>don't have an account?  <span><Link to='/signup'>Sign Up</Link></span></p>
        </div>
      </form>
    </div>)
}
    </div>
  )
}

export default SignIn

