import React from 'react';

const PokemonLogo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
        >
            <g clipPath="url(#clip0_301_1940)">
                <g filter="url(#filter0_ii_301_1940)">
                    <path
                        d="M20 2.3094C22.4752 0.880339 25.5248 0.880339 28 2.3094L40.7846 9.6906C43.2598 11.1197 44.7846 13.7607 44.7846 16.6188V31.3812C44.7846 34.2393 43.2598 36.8803 40.7846 38.3094L28 45.6906C25.5248 47.1197 22.4752 47.1197 20 45.6906L7.21539 38.3094C4.74018 36.8803 3.21539 34.2393 3.21539 31.3812V16.6188C3.21539 13.7607 4.74018 11.1197 7.21539 9.6906L20 2.3094Z"
                        fill="#272B30"
                    />
                </g>
                <path
                    d="M17.152 35V13.1818H25.3338C27.0099 13.1818 28.4162 13.4943 29.5526 14.1193C30.696 14.7443 31.5589 15.6037 32.1413 16.6974C32.7308 17.7841 33.0256 19.0199 33.0256 20.4048C33.0256 21.804 32.7308 23.0469 32.1413 24.1335C31.5518 25.2202 30.6818 26.076 29.5312 26.701C28.3807 27.3189 26.9638 27.6278 25.2805 27.6278H19.858V24.3786H24.7479C25.728 24.3786 26.5305 24.2081 27.1555 23.8672C27.7805 23.5263 28.2422 23.0575 28.5405 22.4609C28.8459 21.8643 28.9986 21.179 28.9986 20.4048C28.9986 19.6307 28.8459 18.9489 28.5405 18.3594C28.2422 17.7699 27.777 17.3118 27.1449 16.9851C26.5199 16.6513 25.7138 16.4844 24.7266 16.4844H21.1044V35H17.152Z"
                    fill="white"
                />
            </g>
            <defs>
                <filter
                    id="filter0_ii_301_1940"
                    x="3.21533"
                    y="0.237549"
                    width="41.5693"
                    height="47.5249"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="-1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.53 0"
                    />
                    <feBlend
                        mode="multiply"
                        in2="shape"
                        result="effect1_innerShadow_301_1940"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.838444 0 0 0 0 0.838444 0 0 0 0 0.838444 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="effect1_innerShadow_301_1940"
                        result="effect2_innerShadow_301_1940"
                    />
                </filter>
                <clipPath id="clip0_301_1940">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default PokemonLogo;
