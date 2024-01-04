import React, { useState } from 'react'
import './LinkPoolButton.css'
import request from '../../request/request'

function LinkPoolButton({ text, backlinks }) {

    const [available, setAvailable] = useState(false);
    const [keywordsData, setKeywordsData] = useState([]);
    const [error, setError] = useState(null);

    const handlePoolButton = async () => {

        const response = await request.checkAvailability(backlinks);

        if(response.status == 500){

            setError("Sponsored post is not valid");

            setTimeout(() => {
                setError(null);
            }, 3000);
        }
        

        setKeywordsData(response.data);

        console.log();

    }

    return (
        <div className='result-and-btn'>
            <div className='linkpool-btn' onClick={handlePoolButton}>
                {text}
            </div>
            {
                keywordsData.length > 0 &&

                <>
                    <p className='data-para-keywords'>Total Backlinks: {keywordsData.length}</p>
                    <p className='data-para-keywords'>Backlinks Found: {keywordsData.filter(keyword => keyword.found).length}</p>
                </>

            }

            {error && <div className='error'>{error}</div>}


        </div>


    )
}

export default LinkPoolButton