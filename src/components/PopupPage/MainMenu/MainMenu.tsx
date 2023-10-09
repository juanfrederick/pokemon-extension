import { useDispatch, useSelector } from 'react-redux';
import CatchedLogo from '../../Logo/CatchedLogo';
import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from 'src/store';
import { resetUser, setPokeCatched } from '../../../reducer/userSlice';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const [isCatching, setIsCatching] = useState<boolean>(false);
    const { username, pokeCatched } = useSelector((state: RootState) => {
        return state.user;
    });

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    useEffect(() => {
        /**this is for not reseting the old state, and fetching user data for updating new value */
        chrome.storage.local.get().then(res => {
            setIsCatching(res.isCatching);

            if (res.username) {
                chrome.runtime.sendMessage(
                    {
                        message: 'FETCH_USER',
                        username: res.username,
                    },
                    res => {
                        const { user } = res;
                        if (user) {
                            dispatch(setPokeCatched(user.pokemonCatched));
                        }
                    },
                );
            }
        });
    }, []);

    /** this is for showing the pokeball when the button clicked */
    const catchHandler = async () => {
        setIsCatching(true);
        chrome.storage.local.set({ isCatching: true });

        try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            if (typeof tab.id === 'number') {
                const response = await chrome.tabs.sendMessage(tab.id, {
                    catchingStatus: true,
                    user: username,
                });

                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    /** this is for unshow the pokeball when the button clicked */
    const stopHandler = async () => {
        setIsCatching(false);
        chrome.storage.local.set({ isCatching: false });
        try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            // @ts-ignore
            const response = await chrome.tabs.sendMessage(tab.id, {
                catchingStatus: false,
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    /** this is for logout and go to signin page */
    const logoutHandler = async () => {
        dispatch(resetUser());
        chrome.storage.local.clear();
        navigate('/signin');

        try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            // @ts-ignore
            const response = await chrome.tabs.sendMessage(tab.id, {
                isLogout: true,
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    /** This is for change to my pokemon page */
    const viewHandler = () => {
        navigate('/pokemons');
    };

    return (
        <div className="poke-pu-menu_container">
            <div className="poke-pu-menu_heading-container">
                <div className="poke-pu-menu_square"></div>
                <h1 className="poke-pu-menu_heading">Overview</h1>
            </div>
            <div className="poke-pu-menu_catched-container">
                <CatchedLogo />
                <div className="poke-pu-menu_catched">
                    <p className="poke-pu-menu_catched-text">
                        Pokemons Catched
                    </p>
                    <p className="poke-pu-menu_catched-value">{pokeCatched}</p>
                </div>
            </div>
            <div className="poke-pu-menu_button-container">
                {!isCatching ? (
                    <button
                        className="poke-pu-menu_button-primary"
                        onClick={catchHandler}
                    >
                        Catch a Pokemon
                    </button>
                ) : (
                    <button
                        className="poke-pu-menu_button-error"
                        onClick={stopHandler}
                    >
                        Stop Catching
                    </button>
                )}
                <button
                    className="poke-pu-menu_button-primary"
                    onClick={viewHandler}
                >
                    View My Pokemon
                </button>

                <button
                    className="poke-pu-menu_button-error"
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MainMenu;
