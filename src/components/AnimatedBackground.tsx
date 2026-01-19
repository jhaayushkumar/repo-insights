import React from 'react';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground: React.FC = () => {
    // Generates 21 items to match the user's HTML structure:
    // <div class="item" style="--i:0;"></div> ... up to 20
    const items = Array.from({ length: 21 }, (_, i) => i);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className={styles.container}>
                {items.map((i) => (
                    <div
                        key={i}
                        className={styles.item}
                        style={{ '--i': i } as React.CSSProperties}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedBackground;
