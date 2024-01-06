// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwt-token'));
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [credits, setCredits] = useState(sessionStorage.getItem('total_credits') || '');


  const _login = (userdata) => {
    sessionStorage.setItem('jwt-token', userdata.token);
    setIsLoggedIn(true);
    sessionStorage.setItem('username', userdata.name);
    setUsername(userdata.name);
    sessionStorage.setItem('total_credits', userdata.total_credits);
    setCredits(userdata.total_credits);
  };

  const _logout = () => {
    sessionStorage.removeItem('jwt-token');
    setIsLoggedIn(false); 
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, _login, _logout, username, credits}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
