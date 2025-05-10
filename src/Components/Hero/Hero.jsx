import React from 'react'
import heroImage from '../../assets/images/bannerImage.avif'
import './Hero.css'
const Hero = () => {
  return (
    <div className='hero'>
      <img src={heroImage} alt="" />
    </div>
  )
}

export default Hero
