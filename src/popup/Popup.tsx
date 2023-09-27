import LoginForm from '@components/Form/LoginForm';
import SignupForm from '@components/Form/SignupForm';
import MainMenu from '@components/MainMenu/MainMenu';
import ProtectedRoutes from '@components/Routes/ProtectedRoutes';
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
            </Routes>
        </div>
    );
};

export default Popup;
