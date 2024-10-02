import React from 'react';

const Hearts = ({ count }) => {
    return (
        <div className="hearts top-0 right-0 absolute">
            {Array.from({ length: count }, (_, i) => (
                <span key={i} className="heart">❤️</span>
            ))}
        </div>
    );
};

export default Hearts;
