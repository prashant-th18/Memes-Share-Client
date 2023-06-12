import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../services/apis";
import { Box } from "@mui/material";
import CreatePost from "../Components/CreatePost";

const HomeScreen = (props) => {
	const navigate = useNavigate();

	// State to get all posts
	const [posts, setPosts] = useState();

	useEffect(() => {
		const fun = async () => {
			const data = await getAllPosts({
				Authorization: `Bearer ${props.accessToken}`,
			});
			console.log(data);
			setPosts(data.data.posts);
		};
		fun();
	}, [props.accessToken]);

	console.log(posts);

	return (
		<Box component="body">
			<CreatePost profileImage={props.profileImage} />
		</Box>
	);
};

export default HomeScreen;
