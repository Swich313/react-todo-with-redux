import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Spinner from "./components/spinner/Spinner";


import './styles/index.scss';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'fr', 'ua', 'de', 'it', 'ru'],
        fallbackLng: "en",
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage',   'subdomain'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        }
    });


ReactDOM.render(
    <Suspense fallback={Spinner}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Suspense>,
  document.getElementById('root')
);

