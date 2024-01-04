import React, { useContext, useEffect, useState } from 'react'
import './LinkPool.css'
import LinkPoolButton from '../Buttons/LinkPoolButton'
import RemoveButton from '../Buttons/RemoveButton';
import request from '../../request/request';
import { statusContext } from '../LinkTracker/LinkTrackerSection';
import TruncateString from '../TruncateString/TruncateString';

function LinkPool() {

    const [links, setLinks] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState(false);

    const status = useContext(statusContext)

    const getAllLinks = async () => {

        const response = await request.getLinks();
        setLinks(response.data);
        console.log(links);
    }

    useEffect(() => {

        getAllLinks();

    }, [status, deleteStatus]);


    return (
        <div className='all-links'>

            {links?.map((item) => {

                return (
                    <>
                        <div className='link-container'>
                            <div className='sponsored-link-single'>

                            <TruncateString originalString={item.sponsoredLink} maxLength={50} />

                            </div>

                            {/* <LinkPoolButton text={`Backlinks - ${item.backlinks.length}`} /> */}

                            <LinkPoolButton text={'Check Availability'} backlinks ={item} />

                            <RemoveButton text={'X'} id={item._id} setDeleteStatus={setDeleteStatus} deleteStatus={deleteStatus} />

                        </div>
                        <hr className='horizontal-line-betw-links' />
                    </>

                )

            })

            }



        </div>
    )
}

export default LinkPool