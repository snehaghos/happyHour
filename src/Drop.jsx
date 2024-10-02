import React from 'react';
import { useDrop } from 'react-dnd';

const Drop = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                border: `1px dashed ${isOver ? 'green' : 'black'}`,
                padding: '10px',
                minHeight: '100px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            {children}
        </div>
    );
};

export default Drop;
