import { useState } from 'react';
import './App.css';
import DashboardSection from './components/Dashboard/DashboardSection';
import Navbar from './components/Navbar/Navbar';
import { DeleteProvider } from './hooks/DeleteContext';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Registration from './components/Forms/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Forms/Login';


function App() {

  const [showDashboard, setShowDashboard] = useState(false);

  const getStarted = () =>{
      setShowDashboard(true);
  }

  return (
    <AuthProvider>
    <Router>
      <div>
        <Navbar onGetStarted = {getStarted}/>
        <DeleteProvider>
        <Routes>
        <Route path="/dashboard" element={ <DashboardSection />} />
         <Route path="/register" element={<Registration />} />
         <Route path="/login" element={<Login />} />
         </Routes>
        </DeleteProvider>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
