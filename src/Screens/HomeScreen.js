import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../services/apis";
import { Box } from "@mui/material";
import CreatePost from "../Components/CreatePost";
import NoMediaPost from "../Components/NoMediaPost";

import { deletePost } from "../services/apis";

import { token } from "../Components/Context/ContextProvider";

const HomeScreen = (props) => {
	const { accessToken, setAccessToken } = useContext(token);

	const navigate = useNavigate();

	// State to get all posts
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fun = async () => {
			try {
				const data = await getAllPosts({
					Authorization: `Bearer ${accessToken}`,
				});
				console.log(data);
				setPosts(data.data.posts);
			} catch (err) {
				console.log("Something is wrong");
			}
		};
		fun();
	}, [accessToken]);

	const handleDeleteClick = async (id) => {
		try {
			await deletePost(id, {
				Authorization: `Bearer ${accessToken}`,
			});
			setPosts((prevState) => {
				return prevState.filter(
					(element) => element._id.toString() !== id.toString()
				);
			});
		} catch (err) {
			console.log(err);
		}
	};

	console.log(posts);

	return (
		<Box component="body">
			<CreatePost profileImage={props.profileImage} />
			{posts.reverse().map((post) => {
				return (
					<NoMediaPost
						key={post._id}
						post={post}
						handleDeleteClick={handleDeleteClick}
					/>
				);
			})}
		</Box>
	);
};

export default HomeScreen;
