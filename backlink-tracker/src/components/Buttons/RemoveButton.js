import React, { createContext, useContext, useState } from 'react'
import request from '../../request/request';
import { DeleteContext } from '../../hooks/DeleteContext';


function RemoveButton({ text, id, setDeleteStatus, deleteStatus }) {


  const {setDeleteStatusText} = useContext(DeleteContext);

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
    //console.log(response.data.message);

    setDeleteStatusText(response.data.message);

    setDeleteStatus(!deleteStatus);

    setTimeout(() => {
      setDeleteStatusText(null);
  }, 3000);

  }

  return (

      <button style={buttonStyle} onClick={() => handleDelete(id)}>
        {text}
      </button>

  )
}

export default RemoveButton