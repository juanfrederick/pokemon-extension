import ThridPartyPage from '@components/ThirdPartyPage/ThridPartyPage';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPokemonAppear } from '../reducer/pokemonSlice';

const ContentScript = () => {
    const [isCatching, setIsCatching] = useState<boolean>(false);
    const dispatch = useDispatch();

    /** This is for get the message for popup */
    chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse,
    ) {
        /** for showing or unshow the pokeball */
        if (request.catchingStatus != undefined) {
            // sendResponse({
            //     status: `Pokeball showed: ${request.catchingStatus}`,
            // });
            chrome.storage.local.get().then(res => {
                setIsCatching(res.isCatching);
            });
        } else {
            sendResponse('Catch a pokemon button not clicked');
        }

        /** for logout */
        if (request.isLogout) {
            setIsCatching(false);
        }

        if (request.message === 'POKEMON_SAVED') {
            chrome.storage.local.get().then(res => {
                const pokemon = res.pokemonAppear;
                const data = {
                    id: pokemon.id,
                    sprites: pokemon.sprites.front_default,
                    name: pokemon.name,
                };
                dispatch(setPokemonAppear(data));
            });
        }
    });

    useEffect(() => {
        /**this is for not reseting the old state*/
        chrome.storage.local.get().then(res => {
            setIsCatching(res.isCatching);
        });
    }, []);

    return <div className="poke-cs">{isCatching && <ThridPartyPage />}</div>;
};

export default ContentScript;
