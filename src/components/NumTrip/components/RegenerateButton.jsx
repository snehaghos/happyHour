import React from 'react';

const RegenerateButton = ({ generateNumbers }) => {
    return (
        <button onClick={generateNumbers} className="p-4 text-white rounded-md" style={{ backgroundColor: 'rgb(49, 20, 70)' }}>
            Regenerate
        </button>
    );
};

export default RegenerateButton;
