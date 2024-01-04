import React from 'react'
import LinkTrackerSection from '../LinkTracker/LinkTrackerSection'
import './DashboardSection.css'
import Navbar from '../Navbar'

function DashboardSection() {

  return (
    <div className='dashboard-container'>
        <Navbar />
        <LinkTrackerSection />
  
    </div>
  )
}

export default DashboardSection