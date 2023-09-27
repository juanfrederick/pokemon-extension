import React from 'react';

const Pokeball = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
        >
            <path
                d="M0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75H0Z"
                fill="#FF0000"
            />
            <path
                d="M0 75C0 116.421 33.5786 150 75 150C116.421 150 150 116.421 150 75H0Z"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M148.5 90C149.484 85.1533 150 80.137 150 75C150 69.863 149.484 64.8467 148.5 60H1.50024C0.516479 64.8467 0 69.863 0 75C0 80.137 0.516479 85.1533 1.50024 90H148.5Z"
                fill="black"
            />
            <circle cx="75" cy="75" r="25" fill="black" />
            <circle cx="75" cy="75" r="15" fill="white" />
        </svg>
    );
};

export default Pokeball;
