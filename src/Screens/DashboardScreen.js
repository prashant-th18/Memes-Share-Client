import { Box } from "@mui/material";
import React from "react";
import Profile from "../Components/Profile";
import { useParams } from "react-router-dom";

const DashboardScreen = () => {
	const { id } = useParams();
	return (
		<Box variant="div">
			<Profile id={id} />
		</Box>
	);
};

export default DashboardScreen;
