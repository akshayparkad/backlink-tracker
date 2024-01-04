// DeleteContext.js
import React, { createContext, useState } from 'react';

export const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {
  const [deleteStatusText, setDeleteStatusText] = useState('');

  const contextValue = {
    deleteStatusText,
    setDeleteStatusText,
  };

  return (
    <DeleteContext.Provider value={contextValue}>
      {children}
    </DeleteContext.Provider>
  );
};
