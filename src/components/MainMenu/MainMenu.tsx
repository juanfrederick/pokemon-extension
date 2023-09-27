import { useDispatch, useSelector } from 'react-redux';
import CatchedLogo from '../Logo/CatchedLogo';
import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from 'src/store';
import { setIsCatching } from '../../reducer/userSlice';

const MainMenu = () => {
    // const [isCatching, setIsCatching] = useState<boolean>(false);
    const { isCatching } = useSelector((state: RootState) => {
        return state.user;
    });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {});

    const catchHandler = async () => {
        dispatch(setIsCatching(true));

        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            function (tab) {
                if (tab[0].id) {
                    chrome.tabs
                        .sendMessage(tab[0].id, { greeting: 'Hello' })
                        .then(res => {
                            console.log(res);
                        });
                }
            },
        );
    };

    return (
        <div className="p-10 bg-white flex flex-col gap-8 w-[400px] relative">
            <div className="flex items-center gap-4">
                <div className="w-4 h-8 bg-[#CABDFF] rounded-[4px]"></div>
                <h1 className="font-semibold text-xl text-default-400">
                    Overview
                </h1>
            </div>
            <div className="w-full h-[132px] bg-[#B5E4CA]/[25%] flex items-center rounded-xl p-4">
                <div className="flex gap-4">
                    <CatchedLogo />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-default-300 font-semibold">
                            Pokemons Catched
                        </p>
                        <p className="text-5xl text-default-400 font-semibold">
                            12
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-6 px-12">
                {!isCatching ? (
                    <button
                        className="py-3 w-full bg-info text-plain-200 font-bold rounded-xl"
                        onClick={catchHandler}
                    >
                        Catch a Pokemon
                    </button>
                ) : (
                    <button
                        className="py-3 w-full bg-error text-plain-200 font-bold rounded-xl"
                        onClick={() => {
                            dispatch(setIsCatching(false));
                        }}
                    >
                        Stop Catching
                    </button>
                )}
            </div>
            <div className="py-6 px-12">
                <button className="py-3 w-full bg-info text-plain-200 font-bold rounded-xl">
                    View My Pokemon
                </button>
            </div>
        </div>
    );
};

export default MainMenu;
