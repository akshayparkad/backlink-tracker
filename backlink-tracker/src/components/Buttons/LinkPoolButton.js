import React, { useState } from 'react'
import './LinkPoolButton.css'
import request from '../../request/request'
import { FallingLines } from 'react-loader-spinner'


function LinkPoolButton({ text, backlinks }) {

    const [keywordsData, setKeywordsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePoolButton = async () => {

        if (keywordsData.length === 0) {

            setLoading(true);

        }
        const response = await request.checkAvailability(backlinks);
        setLoading(false);
        if (response.status === 500) {

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

                {loading ? 'Scanning..' :  text }

            </div>

            {loading && <FallingLines
                color="#4fa94d"
                width="50"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
            }
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