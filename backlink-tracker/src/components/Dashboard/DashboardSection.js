import React from 'react'
import LinkTrackerSection from '../LinkTracker/LinkTrackerSection'
import './DashboardSection.css'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function DashboardSection() {
  
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  return (
    <div className='dashboard-container'>
      <div className='split-1'>
      <Sidebar />
      </div>
      <div className='split-2'>
      <LinkTrackerSection />
      </div>
    </div>

  )
}

export default DashboardSection