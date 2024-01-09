import React from 'react'
import LinkTrackerSection from '../LinkTracker/LinkTrackerSection'
import './DashboardSection.css'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar, { SidebarItem } from '../Sidebar/Sidebar';
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react';

function DashboardSection() {

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  return (
    <div className='dashboard-container'>
      <div className='split-1'>
        <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active />

          <SidebarItem icon={<BarChart3 size={20} />} text="Statistics"  />
          <SidebarItem icon={<UserCircle size={20} />} text="Users" />
          <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
          <SidebarItem icon={<Package size={20} />} text="Orders" alert/>
          <SidebarItem icon={<Receipt size={20} />} text="Billings" />
          
          <hr className='my-3' />
          <SidebarItem icon={<Settings size={20} />} text="Setting" active />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active />

        </Sidebar>
      </div>
      <div className='split-2'>
        <LinkTrackerSection />
      </div>
    </div>

  )
}

export default DashboardSection