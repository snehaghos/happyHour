import React, { useState } from 'react';

const Modal = ({ children, isOpen, onClose,height }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75">
      <div style={{ height:height }} className="relative  mx-auto p-8 w-[695px] h-[500px]  shadow-lg rounded-md bg-slate-100 font-luckiestGuy text-5xl font-bold text-red-500 flex justify-center items-center">
        {children}
        <button className="absolute top-3 right-0 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-red-700 dark:focus:ring-red-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
