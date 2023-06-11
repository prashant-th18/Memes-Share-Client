import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GoogleOAuthProvider>
);
