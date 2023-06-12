import { commonRequest } from "./apiCall";
import { BASE_URL } from "./helper";

export const googleLogin = async (data) => {
	return await commonRequest("POST", `${BASE_URL}/auth/google-login`, data);
};

export const verifyAccessToken = async (header) => {
	return await commonRequest("GET", `${BASE_URL}/auth/verify`, "", header);
};

export const getAllPosts = async (header) => {
	return await commonRequest("GET", `${BASE_URL}/posts`, "", header);
};

export const uploadImage = async (url, data, header) => {
	return await commonRequest("POST", url, data, header);
};

export const uploadPost = async (data, header) => {
	return await commonRequest("POST", `${BASE_URL}/posts/create`, data, header);
};

export const upVotePost = async (id, header) => {
	return await commonRequest(
		"POST",
		`${BASE_URL}/posts/upvote/${id}`,
		"",
		header
	);
};

export const downVotePost = async (id, header) => {
	return await commonRequest(
		"POST",
		`${BASE_URL}/posts/downvote/${id}`,
		"",
		header
	);
};

export const deletePost = async (id, header) => {
	return await commonRequest(
		"DELETE",
		`${BASE_URL}/posts/delete/${id}`,
		"",
		header
	);
};
