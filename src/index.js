import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginPage } from "./components/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<LoginPage/>} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);
