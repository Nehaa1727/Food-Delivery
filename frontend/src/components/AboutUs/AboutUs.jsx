import React from 'react'
import './AboutUs.css'
import { assets } from '../../assets/assets'

const AboutUs = () => {
  return (
    <div className='about' id='about-us'>
      <h2>WHY CHOOSE US ?</h2>
      <p className='about-text'>🍴 “We bring your favorite meals to your doorstep with speed, freshness, and love. Discover a world of flavors, crafted to satisfy every craving.”</p>
      <div className="about-us-cards">
        <div className='first card'>
          <img src="https://img.icons8.com/ios/50/rice-bowl.png" alt="rice-bowl"/>
          <h2>Serve Heathly Food</h2>
          <p>We serve fresh, healthy, and wholesome food made to nourish your body and delight your taste buds.</p>
        </div>
        <div className='second card'>
          <img src="https://img.icons8.com/dotty/80/good-quality.png" alt="good-quality"/>
          <h2>Best Quality</h2>
          <p>We use only the finest ingredients and maintain the highest standards to serve you meals that are fresh quality.</p>
        </div>
        <div className='third card'>
          <img src="https://img.icons8.com/ios/50/in-transit--v1.png" alt="del-truck"/>
          <h2>Fast Delivery</h2>
          <p>We ensure quick and reliable delivery so you can enjoy your favorite meals fresh, hot, and right on time.</p>
        </div>
      </div>
      <div className='app-download' >
        <p>For Better Experince Download <br /> CrunchyBites App</p>
        <div className="app-download-platforms">
          <img src={assets.play_store} alt="" />
          <img src={assets.app_store} alt="" />
        </div>
      </div>
    </div>
  )
}

export default AboutUs
