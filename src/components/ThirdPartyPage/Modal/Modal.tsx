import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import CatchSuccess from '../CatchSuccess/CatchSuccess';

interface AppearType {
    id: number;
    sprites: string;
    name: string;
}

const Modal = () => {
    const [fetchData, setFetchData] = useState<boolean>(true);

    const [pokemonAppear, setPokemonAppear] = useState<AppearType | null>(null);

    const { username } = useSelector((state: RootState) => {
        return state.user;
    });

    chrome.storage.local.get().then(result => {
        const pokemon = result.pokemonAppear;
        const data = {
            id: pokemon.id,
            sprites: pokemon.sprites.front_default,
            name: pokemon.name,
        };
        setPokemonAppear(data);
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
                        id={pokemonAppear!.id}
                        image={pokemonAppear!.sprites}
                        name={pokemonAppear!.name}
                    />
                )}
            </div>
        </div>
    );
};

export default Modal;
