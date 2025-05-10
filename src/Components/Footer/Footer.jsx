import React from 'react'
import appStore from '../../assets/images/appstore.webp'
import googlePlay from '../../assets/images/googleplay.webp'
import linkdin from '../../assets/images/linkdin.png'
import x from '../../assets/images/x.webp'
import facebook from '../../assets/images/facebook.webp'
import youtub from '../../assets/images/youtub.webp'
import instagram from '../../assets/images/instagram.png'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
      <h1 >ZestyZoom</h1>
      </div>
        
        <div className="footer-main">
      <div className="footer-left">
        <h2>About ZestyZoom</h2>
        <p>Who we are</p>
        <p>Blog</p>
        <p>Work with us</p>
        <p>Investor Relations</p>
        <p>Report Fraud</p>
        <p>Press Kit</p>
        <p>Contact Us</p>
      </div>
      <div className="footer-center">
        <h2>For Restaurants</h2>
        <p>Partner with us</p>
        <p>Apps For You</p>
      </div>
      <div className="footer-right">
        <div className="footer-right-left">
            <h2>Lern More</h2>
            <p>Privacy</p>
            <p>Security</p>
            <p>Terms</p>
        </div>
        <div className="footer-right-right">
            <h2>Social links</h2>
            <div className="social-link">
                <img src={linkdin} alt="" />
                <img src={x} alt="" />
                <img src={facebook} alt="" />
                <img src={youtub} alt="" />
                <img src={instagram} alt="" />
            </div>
            <div className="app">
                <img src={appStore} alt="" />
                <img src={googlePlay} alt="" />
            </div>
        </div>
      </div>
      </div>
      <hr />
      <div className="copyright">
        <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2024-2025 © ZestyZoom™ Ltd. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
