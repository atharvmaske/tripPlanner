import React from 'react'
import logo from './images/logo.png'
import './Head.css'


const Head = () => {
  return (
    <div className='main'>
      <img className='logo' src={logo} alt="" />
      <h2>Travel the world with Us</h2>
    </div>
  )
}

export default Head;
