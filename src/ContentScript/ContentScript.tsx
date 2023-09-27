import Pokeball from '@components/Logo/Pokeball';
import React from 'react';

const ContentScript = () => {
    return (
        <div className="w-full h-full relative">
            <div
                className="absolute left-4 bottom-4 cursor-pointer pointer-events-auto"
                onClick={e => {
                    e.stopPropagation();
                    console.log('Halo bang');
                }}
            >
                <Pokeball />
            </div>
        </div>
    );
};

export default ContentScript;
