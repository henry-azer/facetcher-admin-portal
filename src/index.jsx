import React from "react";
import { createRoot } from "react-dom/client";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore, applyMiddleware } from "redux";

import rootReducer from "./store/reducers";

import Routes from "./router/routes";
import { BrowserRouter } from "react-router-dom";

import TranslateButton from "./components/buttons/translate-button";

import "./localization/i18n";

import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/axios-interceptors/axios-interceptors";

const initialState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
            <TranslateButton />
        </BrowserRouter>
    </Provider>
);
