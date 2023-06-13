import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { data, token } from "./Context/ContextProvider";

const CreatePost = (props) => {
	const { userData, setUserData } = useContext(data);

	const navigate = useNavigate();

	const boxClickHandler = (e) => {
		navigate("/post/create");
	};

	const profileClickHandler = (e) => {
		e.stopPropagation();
		navigate(`/profile/${userData._id}`);
	};

	return (
		<Box
			variant="div"
			sx={{
				width: "50%",
				ml: "25%",
				mt: "2%",
				border: "15px",
				borderColor: "red",
				backgroundColor: "#1a1a1b",
				display: "flex",
				justifyContent: "space-evenly",
				borderRadius: "5px",
				padding: "10px",
			}}
			onClick={boxClickHandler}
			cursor="pointer"
		>
			<Avatar
				sx={{
					marginTop: "8px",
				}}
				src={props.profileImage}
				onClick={profileClickHandler}
			/>
			<TextField
				fullWidth
				id="fullWidth"
				size="small"
				placeholder="Create Post"
				sx={{
					marginTop: "8px",
					height: "100%",
					width: "50%",
					borderRadius: "5px",
					backgroundColor: "#bdbdbd",
				}}
			/>
			<Button
				variant="contained"
				sx={{
					width: "5%",
					mr: "1%",
					ml: "1%",
					mt: "10px",
					height: "5%",
				}}
			>
				Post
			</Button>
		</Box>
	);
};

export default CreatePost;
