import React from 'react'
import AboutNav from './AboutUsNavbar/AboutNav'
import Footer from '../Footer/Footer'
import AboutHeader from './AboutUsHeader/AboutHeader'

const AboutUs = () => {
  return (
    <div>
      
      <div className='about-header'>
      <AboutNav/>
      </div>
      <AboutHeader/>
      <Footer/>
      
    </div>
  )
}

export default AboutUs
