import React from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ id, name, color, original, onDropBack }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { id, name, color, original },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (!monitor.didDrop() && !original) {
                onDropBack(item.id);
            }
        },
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: color,
            }}
            className='p-10 m-5 border rounded-md cursor-move border-violet-200'
        >
            {name}
        </div>
    );
};

export default DragItem;
