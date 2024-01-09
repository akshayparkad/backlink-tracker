import React from 'react'
import LinkTrackerSection from '../LinkTracker/LinkTrackerSection'
import './DashboardSection.css'
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar, { SidebarItem } from '../Sidebar/Sidebar';
import { LifeBuoy, Receipt, Package, UserCircle, BarChart3, LayoutDashboard, Settings, LogOut } from 'lucide-react';

function DashboardSection() {

  const { isLoggedIn, credits, _logout} = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {

    console.log("c");
    if (isLoggedIn) {

      _logout();

      navigate('/login');

    } else {

      navigate('/login')
    }
  }

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
          <SidebarItem icon={<Package size={20} />} text="Orders" alert/>
          <SidebarItem icon={<Receipt size={20} />} text={`Credits - ${credits}`}/>
          
          <hr className='my-3' />

          <SidebarItem icon={<Settings size={20} />} text="Setting" active />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active />

          <hr className='my-3' />

          <SidebarItem icon={<LogOut size={20} />} text="Logout" onClick={handleLogout}/>


        </Sidebar>
      </div>
      <div className='split-2'>
        <LinkTrackerSection />
      </div>
    </div>

  )
}

export default DashboardSection