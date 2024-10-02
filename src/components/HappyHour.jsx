import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import Drop from '../Drop';
import DragItem from '../DragItem';

const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const HappyHour = () => {
    const [dragItems, setDragItems] = useState([
        { id: 1, name: 'Item 1', color: generateRandomColor() },
        { id: 2, name: 'Item 2', color: generateRandomColor() },
        { id: 3, name: 'Item 3', color: generateRandomColor() }
    ]);
    const [droppedItems, setDroppedItems] = useState([
        { id: 7, name: 'Item 5', color: generateRandomColor() },
        { id: 8, name: 'Item 6', color: generateRandomColor() },
        { id: 9, name: null, color: null }
    ]);

    const handleDrop = (item) => {
        if (item.original) {
            setDragItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
        }
        setDroppedItems((prevItems) => [
            ...prevItems.filter(Boolean),
            // console.log(...prevItems),
            { id: item.id, name: item.name, color: item.color, uniqueKey: uuidv4() }
        ]);
    };

    const handleDropBack = (id) => {
        const itemToMoveBack = droppedItems.find((item) => item && item.id === id);
        setDroppedItems((prevItems) => prevItems.filter((item) => item && item.id !== id));
        if (itemToMoveBack) {
            setDragItems((prevItems) => [
                ...prevItems,
                { ...itemToMoveBack, uniqueKey: uuidv4() }
            ]);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='flex flex-row items-center justify-center w-full'>
                <div className='w-full rounded-md '>
                    <div className='flex items-center justify-center py-12 text-6xl font-semibold text-violet-500'>HappyHour</div>
                    <div>
                        <div className='flex items-center justify-center w-full p-10 border rounded-md border-violet-200'>
                            {dragItems.map((item) => (
                                <DragItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    color={item.color}
                                    original={true}
                                    onDropBack={handleDropBack}
                                />
                            ))}
                        </div>
                        <div className='w-full p-10 border rounded-md border-violet-200 '>
                            <Drop onDrop={handleDrop} className="flex">
                                {droppedItems.map((item, index) => (
                                    item && (
                                        <div key={item.uniqueKey}>
                                            <DragItem
                                                id={item.id}
                                                name={item.name}
                                                color={item.color}
                                                original={false}
                                                onDropBack={handleDropBack}
                                            />
                                        </div>
                                    )
                                ))}
                            </Drop>
                      
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default HappyHour;
