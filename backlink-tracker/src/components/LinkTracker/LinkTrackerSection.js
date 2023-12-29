import React, { useState } from 'react'
import './LinkTrackerSection.css'


function LinkTrackerSection() {

    const [sponseredPost, setSponseredPost] = useState("");
    const [inputFields, setInputFields] = useState([{ value: '' }]);

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

    const handleSubmitToPool=(e) =>{
    }

    return (
        <>

            <div className='form-label'>

                <div className='left-label'>Add link of Sponsored post</div>
                <div className='right-label'>Add your backlinks</div>

            </div>

            <div className='all-forms'>

                <div className='two-boxes'>
                    <div className='left-box'>
                        <input
                            type="text"
                            placeholder="Left Side Box"
                            onChange={(e) => handleAddLeftBox(e)}
                        />
                    </div>

                    <div className="form-container">

                        {inputFields.map((inputField, index) => (
                            <div key={index} className="input-row">

                                <div className='right-box'>
                                    <input
                                        type="text"
                                        placeholder="Right Side Box"
                                        value={inputField.value}
                                        onChange={(e) => handleChangeRightBox(index, e)}
                                    />
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
        </>
    )
}

export default LinkTrackerSection