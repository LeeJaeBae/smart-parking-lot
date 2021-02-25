import axios from 'axios';
import React from 'react';

const instance = axios.create({ baseURL: process.env.REACT_APP_SERVER_API_BASE_URL });

instance.interceptors.response.use(
	(res) => {
		// console.log(res);
		return res;
	},
	(error) => {
		!!error.msg && alert(error.msg);
		return Promise.reject(error);
	}
);

export default instance;
