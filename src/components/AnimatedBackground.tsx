import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
    // Create an array of 21 items (0 to 20) as per the HTML
    const items = Array.from({ length: 21 }, (_, i) => i);

    return (
        <div className="animation-wrapper">
            <div className="animation-container">
                {items.map((i) => (
                    <div key={i} className="item" style={{ '--i': i } as React.CSSProperties}></div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedBackground;
