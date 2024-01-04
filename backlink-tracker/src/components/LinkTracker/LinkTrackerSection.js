import React, { createContext, useContext, useEffect, useState } from 'react'
import './LinkTrackerSection.css'
import LinkPool from '../LinkPool/LinkPool';
import request from '../../request/request';
import { DeleteContext } from '../../hooks/DeleteContext';


export const statusContext = createContext();

function LinkTrackerSection() {

    const [sponseredPost, setSponseredPost] = useState("");
    const [inputFields, setInputFields] = useState([{ value: '' }]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});



    const { deleteStatusText } = useContext(DeleteContext);


    const validateForm = () => {
        const newErrors = {};

        // Validate Sponsored post
        if (!sponseredPost) {
            newErrors.sponsoredPost = 'Sponsored post is required';
        }

        // Validate Backlinks
        const backlinkErrors = inputFields.map((field, index) => {
            if (!field.value) {
                return `Backlink ${index + 1} is required`;
            }
            return null;
        });

        if (backlinkErrors.some((error) => error !== null)) {
            newErrors.backlinks = backlinkErrors;
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleAddField = () => {
        if (inputFields.length < 5) {
            setInputFields([...inputFields, { value: '' }]);
        }
    };

    const handleRemoveField = (index) => {
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
    };

    const handleChangeRightBox = (index, event) => {
        const newInputFields = [...inputFields];
        newInputFields[index].value = event.target.value;
        setInputFields(newInputFields);
    };

    const handleAddLeftBox = (event) => {
        setSponseredPost(event.target.value)
    }

    const handleSubmitToPool = async (e) => {

        if (validateForm()) {
            const data = {

                sponsoredLink: sponseredPost,
                backlinks: inputFields.map(field => field.value)
            };

            const response = await request.addLinks(data);

            if (response.data.status == 'ok') {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 5000);

            } else {
                setError(response.data.message)
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }

        }
    }


    useEffect(() => {
        // Clean up the timeout when the component unmounts
        return () => clearTimeout();
    }, [deleteStatusText]);

    console.log(deleteStatusText);

    return (
        <>
            <div className='forms-and-btn-container'>

                <div className='all-forms'>

                    <div className='two-boxes'>
                        <div className='left-box'>
                            <input
                                type="text"
                                placeholder="Sponsored post"
                                onChange={(e) => handleAddLeftBox(e)}
                            />

                            {validationErrors.sponsoredPost && (
                                <div className='error'>{validationErrors.sponsoredPost}</div>
                            )}

                        </div>

                        <div className="form-container">

                            {inputFields.map((inputField, index) => (
                                <div key={index} className="input-row">

                                    <div className='right-box'>
                                        <input
                                            type="text"
                                            placeholder="Backlinks to check in sponsored post"
                                            value={inputField.value}
                                            onChange={(e) => handleChangeRightBox(index, e)}
                                        />
                                        {validationErrors.backlinks &&
                                            validationErrors.backlinks[index] && (
                                                <div className='error'>
                                                    {validationErrors.backlinks[index]}
                                                </div>
                                            )}
                                    </div>

                                    {index !== 0 && (
                                        <button type="button" className='removeButton' onClick={() => handleRemoveField(index)}>
                                            -
                                        </button>
                                    )}
                                    {index === inputFields.length - 1 && (
                                        <button type="button" className='addButton' onClick={handleAddField}>
                                            +
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='submit-btn'>

                    <button type="button" className='subbtn' onClick={handleSubmitToPool}>
                        Submit to Pool
                    </button>

                </div>

                {success && <div className='success'>Links added to a pool successfully!</div>}
                {error && <div className='error'>{error}</div>}
                {deleteStatusText && <div className='error'>{deleteStatusText}</div>}

                <div>

                </div>
            </div>

            <statusContext.Provider value={success}>
                <LinkPool />
            </statusContext.Provider>
        </>
    )
}

export default LinkTrackerSection