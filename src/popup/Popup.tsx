import LoginForm from '@components/PopupPage/Form/LoginForm';
import SignupForm from '@components/PopupPage/Form/SignupForm';
import MainMenu from '@components/PopupPage/MainMenu/MainMenu';
import MyPokemons from '@components/PopupPage/MyPokemons/MyPokemons';
import ProtectedRoutes from '@components/PopupPage/Routes/ProtectedRoutes';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import browser, { Tabs } from 'webextension-polyfill';

// Scripts to execute in current tab

/**
 * Executes a string of Javascript on the current tab
 * @param code - The string of code to execute on the current tab
 */

const Popup = () => {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree
    return (
        <div className="font-inter">
            <Routes>
                <Route path="/signin" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <MainMenu />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/pokemons"
                    element={
                        <ProtectedRoutes>
                            <MyPokemons />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </div>
    );
};

export default Popup;
