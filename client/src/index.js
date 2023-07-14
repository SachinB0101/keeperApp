import React from "react";
import {HashRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import {AuthProvider} from "react-auth-kit";

import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AuthProvider
            authType={"cookie"}
            authName={"_auth"}
            cookieDomain={window.location.hostname}
            cookieSecure={false}
        >
            <HashRouter>
                <App />
            </HashRouter>
        </AuthProvider>
    </React.StrictMode>
);
