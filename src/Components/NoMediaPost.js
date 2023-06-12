import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { data, token } from "../Components/Context/ContextProvider";
import { upVotePost, downVotePost } from "../services/apis";

const NoMediaPost = (props) => {
	const { userData, setUserData } = useContext(data);
	const { accessToken, setAccessToken } = useContext(token);

	// States
	const [upVote, setUpVote] = useState(props.post.upVote.length);
	const [downVote, setDownVote] = useState(props.post.downVote.length);
	const [commentNumber, setCommentNumber] = useState(props.post.numComments);

	const handleUpVote = async (e) => {
		e.stopPropagation();
		try {
			const post = await upVotePost(props.post._id, {
				Authorization: `Bearer ${accessToken}`,
			});
			console.log(post);
			setUpVote(post.data.upVote);
			setDownVote(post.data.downVote);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDownVote = async (e) => {
		e.stopPropagation();
		try {
			const post = await downVotePost(props.post._id, {
				Authorization: `Bearer ${accessToken}`,
			});
			console.log(post);
			setUpVote(post.data.upVote);
			setDownVote(post.data.downVote);
		} catch (err) {
			console.log(err);
		}
	};

	// navigation
	const navigate = useNavigate();

	const params = {
		userImage: props.post.userImage,
		userName: props.post.userName,
		userId: props.post.user,
	};

	const handleCommentClick = (e) => {
		const id = props.post._id;
		navigate({
			pathname: `/post/comments/${id}`,
			search: `?${createSearchParams(params)}`,
		});
	};

	const profileClickHandler = (e) => {
		// console.log("Ok");
		e.stopPropagation();
		const id = props.post.user;
		console.log(id);
		navigate(`/profile/${id}`);
	};

	return (
		<Box variant="div">
			<Card
				sx={{
					maxWidth: "50%",
					ml: "25%",
					mt: "2%",
					border: "15px",
					backgroundColor: "#e6ebe7",
				}}
				onClick={handleCommentClick}
			>
				<CardActionArea sx={{ padding: "5px", borderRadius: "5px" }}>
					<CardContent>
						<Box variant="div">
							<Avatar
								onClick={profileClickHandler}
								sx={{
									bgcolor: "deepOrange[500]",
									display: "inline-block",
								}}
								src={props.post.userImage}
							/>
							<Typography
								variant="h5"
								sx={{
									marginLeft: "2%",
									display: "inline",
								}}
							>
								{props.post.userName}
							</Typography>
						</Box>
						<Box
							sx={{
								backgroundColor: "#F3F2F2",
							}}
						>
							<Typography gutterBottom variant="h6" component="div">
								{props.post.title}
							</Typography>
						</Box>
						{props.post.image ? (
							<CardMedia
								component="img"
								image={props.post.image}
								sx={{
									maxHeight: "400",
								}}
								alt="this is a image"
							/>
						) : (
							<Box />
						)}
						<Typography variant="body2" color="text.secondary">
							{props.post.body}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions
					sx={{
						backgroundColor: "#d7d3ce",
						display: "flex",
						justifyContent: "space-around",
					}}
				>
					<Box>
						<Tooltip title="upvote">
							<IconButton onClick={handleUpVote}>
								<Typography variant="p">{upVote}</Typography>
								<ArrowUpwardOutlinedIcon fontSize="large" />
							</IconButton>
						</Tooltip>
						<Tooltip title="downvote">
							<IconButton onClick={handleDownVote}>
								<Typography variant="p">{downVote}</Typography>
								<ArrowDownwardOutlinedIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					</Box>
					<Box>
						<Tooltip title="comment">
							<IconButton onClick={handleCommentClick}>
								<ModeCommentOutlinedIcon fontSize="large" />
								<Typography variant="p">{commentNumber}</Typography>
							</IconButton>
						</Tooltip>
					</Box>
					{props.post.user.toString() === userData._id.toString() && (
						<Box>
							<Tooltip title="delete">
								<IconButton
									onClick={(e) => {
										e.stopPropagation();
										props.handleDeleteClick(props.post._id);
									}}
								>
									<DeleteOutlinedIcon fontSize="large" />
								</IconButton>
							</Tooltip>
						</Box>
					)}
				</CardActions>
			</Card>
		</Box>
	);
};

export default NoMediaPost;
