import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
//@ts-ignore
import loadingAnimation from '../../Logo/loading.json';

interface Props {
    setFechData: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingScreen = ({ setFechData }: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 3000);

        if (loading) {
            setTimeout(() => {
                setFechData(false);
            }, 3000);
        }
    }, [loading]);

    return (
        <div className="poke-cs-loading_container">
            <Lottie
                animationData={loadingAnimation}
                loop={true}
                className="poke-cs-loading_ani"
            />
            {!loading && (
                <h1 className="poke-cs-loading_heading">
                    Looking for a pokemon...
                </h1>
            )}
            {loading && (
                <h1 className="poke-cs-loading_heading">
                    Catching the pokemon...
                </h1>
            )}
        </div>
    );
};

export default LoadingScreen;
