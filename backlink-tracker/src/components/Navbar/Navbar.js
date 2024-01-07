import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Credits from '../Credits/Credits';

function Navbar() {

  const { isLoggedIn, _logout, username } = useAuth();
  const navigate = useNavigate();

  const habdleLoginLogout = () => {

    if (isLoggedIn) {

      _logout();

      navigate('/login');

    } else {

      navigate('/login')
    }


  }

  return (

    <div className='navbar'>
      <div className='logo'>
        BL Tracker
      </div>

      <Credits />

      { isLoggedIn &&<div className='username'>{`Howdy, ${username}`}</div>}

      <div className='get-started' onClick={habdleLoginLogout}> {isLoggedIn ? "Logout" : "Login"} </div>
    </div>
  )
}

export default Navbar