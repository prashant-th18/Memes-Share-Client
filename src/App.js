import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { googleLogin, verifyAccessToken } from "./services/apis";
import HomeScreen from "./Screens/HomeScreen";
import SinglePostScreen from "./Screens/SinglePostScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import CreatePostScreen from "./Screens/CreatePostScreen";
import NoMediaComment from "./Components/NoMediaComment";
import ResponsiveAppBar from "./Components/Navbar/ResponsiveAppBar";

import { data, token } from "./Components/Context/ContextProvider";

const App = () => {
	// Storing the jwt token in 'accessToken' state
	const { userData, setUserData } = useContext(data);
	const { accessToken, setAccessToken } = useContext(token);

	// Google Login Handler
	const handleLogin = async (googleData) => {
		try {
			// googleData.credential is the ID token which tells about the authentication of the user
			const response = await googleLogin({
				token: googleData.credential,
			});

			const jwtToken = response.data.token;
			const userData = response.data.userData;
			// console.log(userData);
			const userObject = {
				userData: {
					...userData,
				},
				jwtToken: jwtToken,
			};
			localStorage.setItem("loginData", JSON.stringify(userObject));
			setAccessToken(jwtToken);
			setUserData({
				...userData,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleError = (result) => {
		console.log(result);
	};

	// Verifying that accessToken is not faulty
	useEffect(() => {
		verifyAccessToken({
			Authorization: `Bearer ${accessToken}`,
		})
			.then((result) => {
				if (result.status !== 200) {
					setAccessToken(null);
					setUserData(null);
				} else {
					setUserData((prevState) => {
						return {
							...result.data.userData,
						};
					});
				}
			})
			.catch((err) => {
				console.log(err);
				setAccessToken(null);
				setUserData(null);
			});
	}, [accessToken, setAccessToken, setUserData]);

	return (
		<Box>
			{accessToken ? (
				<BrowserRouter>
					<Box
						sx={{
							backgroundColor: "#1c1f20",
							minHeight: "100vh",
						}}
					>
						<Box
							component="header"
							sx={{
								position: "sticky",
								top: 0,
								zIndex: 50,
							}}
						>
							<ResponsiveAppBar profileImage={userData.imageUrl} />
						</Box>
						<Routes>
							<Route
								path="/"
								element={
									<HomeScreen
										accessToken={accessToken}
										profileImage={userData.imageUrl}
									/>
								}
							/>
							<Route path="/profile" element={<DashboardScreen />} />
							<Route path="/post/create" element={<CreatePostScreen />} />
							<Route path="/post/comment" element={<SinglePostScreen />} />
							<Route path="/post/comments/:id" element={<NoMediaComment />} />
						</Routes>
					</Box>
				</BrowserRouter>
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
