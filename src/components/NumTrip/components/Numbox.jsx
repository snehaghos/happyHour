import React from 'react';
import { FaCanadianMapleLeaf } from "react-icons/fa6";

const Numbox = ({ cell, updateCell, isUpdated, isNewNumber, mainArray }) => {
    const thisObject = mainArray.find(x => x.number === cell.number);
    return (
        <div
            onClick={updateCell}
            className={`${isUpdated ? 'popOut' : ''} ${isNewNumber ? 'popIn' : ''} flex cursor-pointer justify-center items-center font-bold text-white w-[100px] h-[100px] text-center relative`}
            style={{
                border: '3px solid rgba(255, 255,255,0.43)',
                lineHeight: '70px',
                backgroundColor: cell ? thisObject.color : 'rgba(255, 255, 255,0)',
            }}
        >
            <div className='absolute flex items-center justify-center text-3xl text-white font-gloria'>
                {thisObject.shortName}
            </div>
            <FaCanadianMapleLeaf className='text-6xl text-purple-600/70' />
        </div>
    );
};

export default Numbox;
