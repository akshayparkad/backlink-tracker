import React, { createContext, useState } from 'react'
import request from '../../request/request';


function RemoveButton({ text, id, setDeleteStatus, deleteStatus }) {


  const buttonStyle = {
    backgroundColor: 'red',
    padding: '0.7rem',
    borderRadius: '5px',
    fontWeight: 600,
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };


  const handleDelete = async (id) => {

    const response = await request.deleteLink(id);

    setDeleteStatus(!deleteStatus);
  } 

  return (

    <button style={buttonStyle} onClick={() => handleDelete(id)}>
      {text}
    </button>
  )
}

export default RemoveButton