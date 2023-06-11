import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { googleLogin, verifyAccessToken } from "./services/apis";

const App = () => {
	// Storing the jwt token in 'accessToken' state
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("jwtToken")
			? JSON.parse(localStorage.getItem("jwtToken"))
			: null
	);

	// Google Login Handler
	const handleLogin = async (googleData) => {
		try {
			// googleData.credential is the ID token which tells about the authentication of the user
			const response = await googleLogin({
				token: googleData.credential,
			});

			const token = response.data.token;
			localStorage.setItem("jwtToken", JSON.stringify(token));
			setAccessToken(token);
		} catch (err) {
			console.log(err);
		}
	};

	const handleError = (result) => {
		console.log(result);
	};

	// Verifying that accessToken is not faulty
	if (accessToken) {
		verifyAccessToken({
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		})
			.then((result) => {
				console.log(result);
				if (result.status !== 200) {
					setAccessToken(null);
				}
			})
			.catch((err) => {
				console.log(err);
				setAccessToken(null);
			});
	}

	return (
		<Box>
			{accessToken ? (
				<h1>Op</h1>
			) : (
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
					<GoogleLogin
						onSuccess={handleLogin}
						onError={handleError}
						useOneTap
					/>
				</Box>
			)}
		</Box>
	);
};

export default App;
