import React, { useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import CatchSuccess from '../CatchSuccess/CatchSuccess';

const Modal = () => {
    const [fetchData, setFetchData] = useState<boolean>(true);

    const { pokemonAppear } = useSelector((state: RootState) => {
        return state.pokemon;
    });

    const { username } = useSelector((state: RootState) => {
        return state.user;
    });

    return (
        <div className="poke-cs-modal_container">
            <div>
                <h1 className="poke-cs-modal_heading">Catch a Pokemon</h1>
                <p className="poke-cs-modal_pg">
                    It's a wild west out there, Good luck, Pokemon Trainer{' '}
                    {username}.
                </p>

                {fetchData && <LoadingScreen setFechData={setFetchData} />}
                {!fetchData && (
                    <CatchSuccess
                        id={pokemonAppear.id}
                        image={pokemonAppear.sprites}
                        name={pokemonAppear.name}
                    />
                )}
            </div>
        </div>
    );
};

export default Modal;
