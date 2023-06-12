import { Box, Divider, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext, useEffect, useState } from "react";

import { data, token } from "./Context/ContextProvider";
import NoMediaPost from "./NoMediaPost";
import { getAllPosts, getUserData } from "../services/apis";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
	// props.id => UserId whose profile we want to render

	console.log(props);
	const { userData, setUserData } = useContext(data);
	const { accessToken, setAccessToken } = useContext(token);

	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserPosts = async () => {
			// gets post of this user
			const posts = await getAllPosts(
				{
					Authorization: `Bearer ${accessToken}`,
				},
				props.id
			);
			const user = await getUserData(props.id, {
				Authorization: `Bearer ${accessToken}`,
			});
			// console.log("My Profile", user);
			setUser({
				...user.data.user,
			});
			setPosts([...posts.data.posts]);
		};
		fetchUserPosts();
	}, [accessToken, props.id]);

	console.log(user);

	const logoutHandler = (e) => {
		localStorage.removeItem("loginData");
		alert("Logged Out Successfully!");
		navigate("/");
		window.location.reload();
	};

	return (
		<Box
			variant="div"
			sx={{
				ml: "25%",
				mr: "25%",
				mt: "1%",
				pt: "1%",
				pb: "5%",
				backgroundColor: "#242424",
			}}
		>
			<Box
				component="header"
				sx={{
					display: "flex",
					mt: "5%",
					ml: "10%",
					mr: "0%",
					mb: "4%",
				}}
			>
				<Box component="div" sx={{ flexGrow: "1", flexBasis: "0%", mr: "15%" }}>
					<img
						src={user.imageUrl}
						alt="profile"
						width="150px"
						height="150px"
						style={{ borderRadius: "75px" }}
					/>
				</Box>
				<Box component="section" sx={{ pl: "0%", flexGrow: "2" }}>
					<Typography variant="h4" sx={{ color: "#e6ebe7" }}>
						{user.name}
					</Typography>
				</Box>
				{props.id === userData._id && (
					<Box>
						<IconButton
							sx={{ display: "flex", flexDirection: "column" }}
							onClick={logoutHandler}
						>
							<LogoutIcon fontSize="large" sx={{ color: "#e6ebe7" }} />
							<br />
							<Typography
								variant="p"
								sx={{ color: "#e6ebe7", fontSize: "50%" }}
							>
								Logout
							</Typography>
						</IconButton>
					</Box>
				)}
			</Box>
			<Divider sx={{ backgroundColor: "#e6ebe7" }} />
			<Box>
				{posts
					.slice(0)
					.reverse()
					.map((post) => {
						return <NoMediaPost key={new Date().toISOString()} post={post} />;
					})}
			</Box>
		</Box>
	);
};

export default Profile;
