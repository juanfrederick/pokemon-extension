import Pokeball from '@components/Logo/Pokeball';
import React, { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import useCatchPokemon from '../../hooks/useCatchPokemon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { setPokemonAppear, setBallIsClicked } from '../../reducer/pokemonSlice';
import { setUsername } from '../../reducer/userSlice';

const ThridPartyPage = () => {
    const { ballIsClicked } = useSelector((state: RootState) => {
        return state.pokemon;
    });

    const dispatch = useDispatch<AppDispatch>();

    /** this is for getting the username and pass to the redux */
    useEffect(() => {
        chrome.storage.local.get().then(res => {
            dispatch(setUsername(res.username));
        });
    }, []);

    /** Handler when the ball clicked */
    const ballHandler = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        e.stopPropagation();
        if (!ballIsClicked) {
            dispatch(setBallIsClicked(true));

            chrome.runtime.sendMessage({
                message: 'FETCH_POKEMON',
            });
        }
    };

    return (
        <>
            <div className="poke-cs-third-party-page" onClick={ballHandler}>
                <Pokeball />
            </div>
            {ballIsClicked && <Modal />}
        </>
    );
};

export default ThridPartyPage;
