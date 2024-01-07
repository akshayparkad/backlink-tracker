import React, { useContext, useEffect, useState } from 'react';
import './LinkPool.css';
import LinkPoolButton from '../Buttons/LinkPoolButton';
import RemoveButton from '../Buttons/RemoveButton';
import request from '../../request/request';
import { statusContext } from '../LinkTracker/LinkTrackerSection';
import TruncateString from '../TruncateString/TruncateString';
import { useAuth } from '../../context/AuthContext';
import { FallingLines } from 'react-loader-spinner'



function LinkPool() {
    const [links, setLinks] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const status = useContext(statusContext);

    const { isLoggedIn } = useAuth();

    const getAllLinks = async () => {
        setIsLoading(true);
        try {

            const response = await request.getLinks();
            setIsLoading(false);
            setLinks(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    };

    useEffect(() => {

        getAllLinks();


    }, [status, deleteStatus, isLoggedIn]);

    return (

        <div className='all-links'>

            {isLoading ? (
            <div className='loading-container'>
                <FallingLines
                color="#4fa94d"
                width="50"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
            </div>

            ) : links.length > 0 ? (

                    links.map((item) => (
                        <React.Fragment key={item._id}>
                            <div className='link-container'>
                                <div className='sponsored-link-single'>
                                    <TruncateString originalString={item.sponsoredLink} maxLength={50} />
                                </div>

                                <LinkPoolButton text={'Check Availability'} backlinks={item} />

                                <RemoveButton text={'Remove'} id={item._id} setDeleteStatus={setDeleteStatus} deleteStatus={deleteStatus} />
                            </div>
                            <hr className='horizontal-line-betw-links' />
                        </React.Fragment>
                    ))
                ) : (
                    <p>No links available</p>
                )}
        </div>
    );
}

export default LinkPool;
