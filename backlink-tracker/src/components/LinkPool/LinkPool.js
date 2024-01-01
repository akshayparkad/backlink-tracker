import React, { useContext, useEffect, useState } from 'react'
import './LinkPool.css'
import LinkPoolButton from '../Buttons/LinkPoolButton'
import RemoveButton from '../Buttons/RemoveButton';
import request from '../../request/request';
import { statusContext } from '../LinkTracker/LinkTrackerSection';

function LinkPool() {

    const [links, setLinks] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState();

    const status = useContext(statusContext)

    const getAllLinks = async () => {

        const response = await request.getLinks();
        setLinks(response.data);
        console.log(links);
    }

    useEffect(() => {

        getAllLinks();

    }, [status, deleteStatus]);


    const handleCheckAvailability = () => {

    }

    return (
        <>

            {links.map((item) => {

                return (
                    <>
                    <div className='link-container'>

                        {item.sponsoredLink}

                        <LinkPoolButton text={`Backlinks - ${item.backlinks.length}`} />

                        <LinkPoolButton text={'Check Availability'} onClick={handleCheckAvailability} />

                        <RemoveButton text={'X'} id={item._id} setDeleteStatus={setDeleteStatus} deleteStatus={deleteStatus} />

                    </div>
                    {/* <hr style={{ color: 'grey', width: '75%' }} /> */}
                    </>

                )

            })

            }

            

        </>
    )
}

export default LinkPool