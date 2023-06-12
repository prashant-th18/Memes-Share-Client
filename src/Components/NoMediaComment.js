import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
	CardActions,
	Tooltip,
	IconButton,
	Container,
	TextField,
	Button,
	Avatar,
	CardMedia,
} from "@mui/material";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useContext, useEffect, useState } from "react";

import { data, token } from "../Components/Context/ContextProvider";
import Comment from "./Comment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	deletePost,
	downVotePost,
	getPost,
	postComments,
	upVotePost,
} from "../services/apis";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const NoMediaComment = (props) => {
	const { userData, setUserData } = useContext(data);
	const { accessToken, setAccessToken } = useContext(token);

	const navigate = useNavigate();

	let query = useQuery();
	const userImage = query.get("userImage");
	const userName = query.get("userName");
	const userId = query.get("userId");

	// id -> PostId
	const { id } = useParams();
	console.log(id);
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState();
	const [title, setTitle] = useState();
	const [body, setBody] = useState();
	const [image, setImage] = useState();
	const [upVote, setUpVote] = useState(0);
	const [downVote, setDownVote] = useState(0);
	const [commentNumber, setCommentNumber] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getPost(id, {
				Authorization: `Bearer ${accessToken}`,
			});
			const resPost = response.data.post;
			console.log(resPost);
			setComments((prevState) => {
				return [...prevState, ...resPost.comments];
			});
			setTitle(resPost.title);
			setBody(resPost.body);
			setImage(resPost.image);
			setUpVote(resPost.upVote.length);
			setDownVote(resPost.downVote.length);
			setCommentNumber(resPost.numComments);
		};
		fetchData();
	}, [id, accessToken]);

	const handleUpVote = async (e) => {
		try {
			const post = await upVotePost(id, {
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
		try {
			const post = await downVotePost(id, {
				Authorization: `Bearer ${accessToken}`,
			});
			console.log(post);
			setUpVote(post.data.upVote);
			setDownVote(post.data.downVote);
		} catch (err) {
			console.log(err);
		}
	};

	const handleCommentClick = (e) => {
		setComment(e.target.value);
	};

	const handleDelete = async (e) => {
		e.stopPropagation();
		await deletePost(id, {
			Authorization: `Bearer ${accessToken}`,
		});
		navigate("/");
		window.location.reload();
	};

	const postComment = async (e) => {
		if (!comment) return;

		try {
			const newPost = await postComments(
				id,
				{
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				{
					comment: {
						body: comment,
						userName: userData.name,
						user: userData._id,
						imageUrl: userData.imageUrl,
					},
				}
			);
			setComments([...newPost.data.comments]);
			setCommentNumber(newPost.data.numComments);
			setComment("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Box>
				<Card
					sx={{
						maxWidth: "50%",
						ml: "25%",
						mt: "2%",
						border: "15px",
						backgroundColor: "#e6ebe7",
					}}
				>
					<CardActionArea
						sx={{
							padding: "5px",
							borderRadius: "5px",
						}}
					>
						<CardContent>
							<Box variant="div">
								<Avatar
									sx={{
										bgcolor: "deepOrange[500]",
										display: "inline-block",
									}}
									src={userImage}
								/>
								<Typography
									variant="h5"
									sx={{
										marginLeft: "2%",
										display: "inline",
									}}
								>
									{userName}
								</Typography>
							</Box>
							<Typography variant="h5">{title}</Typography>
							{image ? (
								<CardMedia
									component="img"
									image={image}
									sx={{
										maxHeight: "400",
									}}
									alt="green iguana"
								/>
							) : (
								<Box />
							)}
							<Typography variant="body2" color="text.secondary">
								{body}
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
									<ArrowDownwardOutlinedIcon fontSize="large" />
									<Typography variant="p">{downVote}</Typography>
								</IconButton>
							</Tooltip>
						</Box>
						<Box>
							<Tooltip title="comment">
								<IconButton>
									<ModeCommentOutlinedIcon fontSize="large" />
									<Typography variant="p">{commentNumber}</Typography>
								</IconButton>
							</Tooltip>
						</Box>
						{userId.toString() === userData._id.toString() && (
							<Box>
								<Tooltip title="delete">
									<IconButton onClick={handleDelete}>
										<DeleteOutlinedIcon fontSize="large" />
									</IconButton>
								</Tooltip>
							</Box>
						)}
					</CardActions>
				</Card>
				<Box>
					<Box
						sx={{
							maxWidth: "50%",
							ml: "25%",
							mt: "2%",
							border: "15px",
							backgroundColor: "#1a1a1b",
							borderRadius: "5px",
							padding: "10px 0px",
						}}
					>
						<Container
							sx={{
								display: "flex",
							}}
						>
							<Avatar
								sx={{ marginTop: "8px", mr: "8px" }}
								src={userData.imageUrl}
							/>
							<TextField
								fullWidth
								// inputRef={}
								id="fullWidth-multiline"
								size="small"
								placeholder="Body"
								value={comment}
								multiline
								rows={4}
								sx={{
									marginTop: "10px",
									height: "100%",
									width: "100%",
									borderRadius: "5px",
									backgroundColor: "#948f8f",
								}}
								onChange={handleCommentClick}
							></TextField>
						</Container>
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
									mt: "10px",
									height: "5%",
								}}
								onClick={postComment}
							>
								Comment
							</Button>
						</Container>
					</Box>
				</Box>
				{comments
					.slice(0)
					.reverse()
					.map((comment) => {
						return (
							<Comment
								userName={comment.userName}
								body={comment.body}
								imageUrl={comment.imageUrl}
							/>
						);
					})}
			</Box>
		</>
	);
};

export default NoMediaComment;
