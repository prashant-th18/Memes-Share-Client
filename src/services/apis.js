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
