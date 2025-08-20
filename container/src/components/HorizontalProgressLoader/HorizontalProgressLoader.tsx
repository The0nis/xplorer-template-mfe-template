// src/components/HorizontalProgressLoader/HorizontalProgressLoader.js
import React from 'react';

const HorizontalProgressLoader = () => {
    return (
        <div className="w-full h-1 bg-gray-200 overflow-hidden">
            <div className="h-full bg-blue-500 animate-progress-bar"></div>
        </div>
    );
};

export default HorizontalProgressLoader;
