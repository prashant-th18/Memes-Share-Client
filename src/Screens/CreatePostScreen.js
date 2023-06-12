import { Button, Container, Divider, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import "../App.css";
import { uploadImage } from "../services/apis";
import { uploadPost } from "../services/apis";
import { useNavigate } from "react-router-dom";

import { token, data } from "../Components/Context/ContextProvider";

const CreatePostScreen = () => {
	const navigate = useNavigate();

	// To get info about the user
	const { userData, setUserData } = useContext(data);
	const { accessToken, setAccessToken } = useContext(token);

	// state to maintain whether to take Text as input or image
	const [tab, setTab] = useState(0);

	// state for the title of the post
	const [postTitle, setPostTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const [postImage, setPostImage] = useState("");

	const postTitleChangeHandler = (e) => {
		setPostTitle(e.target.value);
	};

	const postBodyChangeHandler = (e) => {
		setPostBody(e.target.value);
	};

	const imageHandler = (e) => {
		setPostImage(e.target.files[0]);
	};

	const createPost = async (e) => {
		if (!postTitle) return;
		let imageUrl, body;
		if (tab === 0) {
			if (!postBody) return;
			body = postBody;
		} else {
			if (!postImage) return;
			// Image
			const data = new FormData();
			data.append("file", postImage);
			data.append("upload_preset", process.env.REACT_APP_PRESET);

			const header = {
				"Content-Type": "multipart/form-data",
			};

			const response = await uploadImage(
				"https://api.cloudinary.com/v1_1/dioby3ssj/image/upload",
				data,
				header
			);

			imageUrl = response.data.url;
		}

		try {
			const post = await uploadPost(
				{
					title: postTitle,
					body: body,
					user: userData._id,
					userName: userData.name,
					userImage: userData.imageUrl,
					image: imageUrl,
					upVote: [],
					downVote: [],
					comments: [],
				},
				{
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				}
			);
			console.log(post);

			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Container
				sx={{
					width: "50%",
					ml: "25%",
					mt: "2%",
					color: "white",
					border: "15px",
					borderColor: "red",
					backgroundColor: "#242424",
					borderRadius: "5px",
					padding: "10px",
				}}
			>
				<h2>Create Post</h2>
				<Divider sx={{ backgroundColor: "white" }} />
				<Container
					sx={{
						border: "15px",
						display: "flex",
						justifyContent: "space-around",
					}}
				>
					<Container>
						<h3
							onClick={() => {
								setTab(0);
							}}
							style={{ cursor: "pointer" }}
						>
							Text
						</h3>
						{tab === 0 && <Divider sx={{ backgroundColor: "white" }} />}
					</Container>
					<Container>
						<h3
							onClick={() => {
								setTab(1);
							}}
							style={{ cursor: "pointer" }}
						>
							Image
						</h3>
						{tab === 1 && <Divider sx={{ backgroundColor: "white" }} />}
					</Container>
				</Container>
				<Container>
					<TextField
						fullWidth
						id="fullWidth"
						size="small"
						placeholder="Title"
						value={postTitle}
						sx={{
							marginTop: "8px",
							height: "100%",
							width: "100%",
							borderRadius: "5px",
							backgroundColor: "#948f8f",
						}}
						onChange={postTitleChangeHandler}
					/>
					{tab === 0 && (
						<TextField
							fullWidth
							id="fullWidth-multiline"
							size="small"
							placeholder="body"
							multiline
							rows={4}
							value={postBody}
							sx={{
								marginTop: "10px",
								height: "100%",
								width: "100%",
								borderRadius: "5px",
								backgroundColor: "#948f8f",
							}}
							onChange={postBodyChangeHandler}
						/>
					)}
					{tab === 1 && (
						<>
							<input
								type="file"
								className="custom-file-input"
								onChange={imageHandler}
								id="inputGroupFile01"
							/>
						</>
					)}
					<Container
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							width: "100%",
						}}
					>
						<Button
							variant="contained"
							sx={{
								width: "5%",
								mt: "10px",
								height: "5%",
							}}
							onClick={createPost}
						>
							Post
						</Button>
					</Container>
				</Container>
			</Container>
		</>
	);
};

export default CreatePostScreen;
