import React, { useContext, useEffect, useState } from 'react';
import './LinkPool.css';
import LinkPoolButton from '../Buttons/LinkPoolButton';
import RemoveButton from '../Buttons/RemoveButton';
import request from '../../request/request';
import { statusContext } from '../LinkTracker/LinkTrackerSection';
import TruncateString from '../TruncateString/TruncateString';
import { useAuth } from '../../context/AuthContext';


function LinkPool() {
    const [links, setLinks] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const status = useContext(statusContext);

    const {isLoggedIn} = useAuth();

    const getAllLinks = async () => {
        try {
            const response = await request.getLinks();
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
            {links.length > 0 ? (
                links.map((item) => (
                    <React.Fragment key={item._id}>
                        <div className='link-container'>
                            <div className='sponsored-link-single'>
                                <TruncateString originalString={item.sponsoredLink} maxLength={50} />
                            </div>

                            <LinkPoolButton text={'Check Availability'} backlinks={item} />

                            <RemoveButton text={'X'} id={item._id} setDeleteStatus={setDeleteStatus} deleteStatus={deleteStatus} />
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
