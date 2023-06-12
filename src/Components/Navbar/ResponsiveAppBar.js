import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/helper";

import { data } from "../Context/ContextProvider";

const ResponsiveAppBar = (props) => {
	const { userData, setUserData } = useContext(data);

	const navigate = useNavigate();

	// AppBar Logo Click Handler
	const navigateToDashboard = (e) => {
		navigate("/");
	};

	const navigateToProfile = (e) => {
		const id = userData._id;
		console.log(id);
		navigate(`/profile/${id}`);
	};

	const logoImgSource = `${BASE_URL}/images/logo.png`;

	return (
		<>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#121212",
				}}
			>
				<Container maxWidth="xl">
					<Toolbar
						sx={{
							justifyContent: "space-between",
						}}
						disableGutters
					>
						<Box
							sx={{
								display: "flex",
							}}
						>
							<Avatar
								src={logoImgSource}
								alt="Share-Memes Social App"
								sx={{
									cursor: "pointer",
								}}
								onClick={navigateToDashboard}
							/>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									color: "#d7d3ce",
									cursor: "pointer",
								}}
								onClick={navigateToDashboard}
							>
								Memes Share
							</Typography>
						</Box>
						<Box
							sx={{
								flexGrow: 0,
							}}
						>
							<Tooltip title="Open Profile">
								<IconButton
									sx={{
										p: 0,
									}}
									onClick={navigateToProfile}
								>
									<Avatar alt="Remy Sharp" src={props.profileImage} />
								</IconButton>
							</Tooltip>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default ResponsiveAppBar;
