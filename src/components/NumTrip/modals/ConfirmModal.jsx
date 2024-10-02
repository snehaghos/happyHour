import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 modal">
            <div className="modal-content">
                <h2 className="font-luckiestGuy text-green-500 text-5xl">Confirm Start Over</h2>
                <p className='text-blue-500 text-3xl'>Do you want to start over the game?</p>
                <button onClick={onConfirm} className="p-4 text-3xl rounded-md text-violet-700">Yes</button>
                <button onClick={onCancel } className="p-4 text-3xl rounded-md text-violet-700">No</button>
            </div>
        </div>
    );
};
export default ConfirmModal;