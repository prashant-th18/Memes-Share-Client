import React, { createContext, useState } from "react";

export const token = createContext();
export const data = createContext();

const ContextProvider = (props) => {
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
				? JSON.parse(localStorage.getItem("loginData")).jwtToken
				: null
			: null
	);

	const [userData, setUserData] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
				? JSON.parse(localStorage.getItem("loginData")).userData
				: null
			: null
	);

	return (
		<>
			<token.Provider value={{ accessToken, setAccessToken }}>
				<data.Provider value={{ userData, setUserData }}>
					{props.children}
				</data.Provider>
			</token.Provider>
		</>
	);
};

export default ContextProvider;

// This file is needed because, whenever a successful registration is done,
// we want to show something on the home page
