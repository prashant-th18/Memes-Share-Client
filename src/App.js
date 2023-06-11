import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const App = () => {
	// Storing the jwt token in 'accessToken' state
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData")).user.jwtToken
			: null
	);

	// Google Login Handler
	const handleLogin = (googleData) => {
    
  };

	const handleError = (result) => {
		console.log(result);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				minHeight: "100vh",
				alignItems: "center",
				backgroundColor: "#A5C9DE",
				flexDirection: "column",
			}}
		>
			<Typography variant="h2" component="h2">
				Login With Google
			</Typography>
			<br />
			<GoogleLogin onSuccess={handleLogin} onError={handleError} useOneTap />
		</Box>
	);
};

export default App;
