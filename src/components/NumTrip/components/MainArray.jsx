import React from 'react';

const MainArray = ({ mainArray, currentSet }) => {
    return (
        <div className="flex flex-row my-4 main-array">
            {mainArray.map((item, index) => {
                const isInCurrentSet = currentSet.includes(item);
                return (
                    <div
                        key={index}
                        className='w-[50px] h-[50px] text-center m-2'
                        style={{
                            lineHeight: '50px',
                            border: '2px inset  #fff',
                            backgroundColor: isInCurrentSet ? item.color : '#ffffff',
                            color: isInCurrentSet ? '#ffffff' : '#000000',
                            fontWeight: isInCurrentSet ? 'bold' : 'normal'
                        }}
                    >
                        {item.shortName}
                    </div>
                );
            })}
        </div>
    );
};

export default MainArray;
