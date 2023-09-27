import * as React from 'react';
import { createRoot } from 'react-dom/client';
import browser from 'webextension-polyfill';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';

import Popup from './Popup';
import '../styles/app.css';

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
    const container = document.getElementById('popup');
    const root = createRoot(container!);

    root.render(
        <Provider store={store}>
            <HashRouter>
                <Popup />
            </HashRouter>
        </Provider>,
    );
});
