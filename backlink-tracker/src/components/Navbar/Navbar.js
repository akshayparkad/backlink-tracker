import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar({onGetStarted}) {

  return (
    <div className='navbar'>
        <div className='logo'>
            BL Tracker
        </div>

        <div className='get-started' onClick={onGetStarted}>
           Get Started
        </div>
    </div>
  )
}

export default Navbar