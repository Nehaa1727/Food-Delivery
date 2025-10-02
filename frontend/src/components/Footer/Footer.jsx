import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className="footer-logo" src={assets.logo} alt="" />
            <p> CrunchyBites is your go-to food delivery platform, bringing together delicious meals from your favorite restaurants. Whether it’s a quick snack or a hearty dinner, we make sure every bite is fresh, flavorful, and delivered on time.</p>
            <div className="footer-social-icons">
                <a href="https://www.facebook.com" target="_blank"><img src={assets.facebook_icon} alt="" /></a>
                <a href="https://www.twitter.com" target="_blank"><img src={assets.twitter_icon} alt="" /></a>
                <a href="https://www.linkedin.com" target="_blank"><img src={assets.linkedin_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 424-345-6758</li>
            <li>contact@crunchybites.com</li>
           </ul>  
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © CrunchyBites.com - All rights reserved.</p> 
      <p className="footer-copyright">Delivering fresh flavors, anytime, anywhere.</p>
    </div>
  )
}

export default Footer
