import React, { useState } from 'react';
import './Sidebar.css';
import ThemeButton from './ThemeButton';


const Sidebar = ({ onThemeChange, onHome, onStartOver }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="toggle-btn absolute w-[30px] h-[20px] right-[-40px] bg-gray-100/40" onClick={toggleSidebar}>
                ☰
            </div>
            {isOpen && (
                <div className="sidebar-content">
                    <ul>
                        <li onClick={onHome}>Home</li>
                        <li onClick={onStartOver}>Start Over</li>
                        <li>
                            <ThemeButton /> {/* Add the ThemeButton component */}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
