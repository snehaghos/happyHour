import React from 'react';

const ReshuffleButton = ({ reshuffleBoardPositions }) => {
    return (
        <button
            className="px-4 py-2 mt-4 font-semibold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none"
            onClick={reshuffleBoardPositions}
        >
            Reshuffle Board
        </button>
    );
};

export default ReshuffleButton;
