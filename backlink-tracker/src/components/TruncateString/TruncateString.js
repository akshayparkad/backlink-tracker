
import React from 'react';

const TruncateString = ({ originalString, maxLength }) => {
    
    const truncatedString = originalString.length > maxLength
        ? originalString.slice(0, maxLength) + '...'
        : originalString;

    return (
        <div>
            <p>{truncatedString}</p>
        </div>
    );
};

export default TruncateString;
