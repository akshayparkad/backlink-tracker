import React from 'react'
import LinkTrackerSection from '../LinkTracker/LinkTrackerSection'
import './DashboardSection.css'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

function DashboardSection() {
  
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  return (
    <div className='dashboard-container'>
      <LinkTrackerSection />
    </div>

  )
}

export default DashboardSection