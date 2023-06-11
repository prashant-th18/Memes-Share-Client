import axios from "axios";

export const commonRequest = async (methods, url, body, headers) => {
	let config = {
		method: methods,
		url: url,
		headers: headers ? headers : { "Content-Type": "application/json" },
		data: body,
	};

	try {
		const returnedData = await axios(config);
		return returnedData;
	} catch (err) {
		return err;
	}
};
