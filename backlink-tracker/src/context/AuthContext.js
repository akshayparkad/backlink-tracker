// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwt-token'));
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');


  const _login = (token, username) => {
    sessionStorage.setItem('jwt-token', token);
    setIsLoggedIn(true);
    sessionStorage.setItem('username', username);
    setUsername(username);
  };

  const _logout = () => {
    sessionStorage.removeItem('jwt-token');
    setIsLoggedIn(false); 
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, _login, _logout, username}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
