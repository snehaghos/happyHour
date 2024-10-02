import React from 'react';

const Score = ({ score }) => {
    return (
        <div className='absolute top-0 m-8 text-3xl font-bold text-white right-8'>
            Score: {score}
        </div>
    );
};

export default Score;
