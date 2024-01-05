// AuthContext.js
import React, { createContext, useReducer } from 'react';
import request from '../request/request';
import axios from 'axios';

//const BASE_URL = "http://localhost:8000/api/";
const BASE_URL = "http://192.168.1.7:8000/api/";
axios.defaults.baseURL = BASE_URL;


const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState);


  const registerUser = async (user) => {

    try {

      const response = await axios.post('/register', user);

      console.log(response);

      if (response.data.status === "ok") {

        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data.user });
        return { data: response.data }; // Return only the data payload

      } else {

        dispatch({ type: 'REGISTER_FAILURE', payload: response.data.error });
        return { error: response.data.error || 'Registration failed.' }; // Return only the error payload
      }

    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'An error occurred.' });
      return { error: 'An error occurred during registration.' };
    }
  };


  const loginUser = async (user) => {
    try {
      const response = await fetch('API_URL/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: data.error });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred.' });
    }
  };

  return (
    <AuthContext.Provider value={{ state, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
