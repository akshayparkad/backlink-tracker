import React from 'react'

function LinkSubmitButton({children}) {

    return (
        <>
            <button type="button" className='subbtn' onClick={children}>
                Submit to Pool
            </button>
        </>
    )
}

export default LinkSubmitButton