import axios from 'axios'
import dayjs from 'dayjs'
import { decode } from 'html-entities';


let USERFROMLS = localStorage.getItem('nimfd-user') ? JSON.parse(localStorage.getItem('nimfd-user')) : null

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_DEV_API,
    headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use(
	(req) => {
		USERFROMLS = localStorage.getItem('nimfd-user') ? JSON.parse(localStorage.getItem('nimfd-user')) : null
		if (USERFROMLS) {
			req.headers['Authorization'] = `Bearer ${USERFROMLS.accessToken}`;
		}
		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res) => {
		const test = decode(JSON.stringify(res));
		return JSON.parse(test);
	},
	async (err) => {
		const originalConfig = err.config;

		if (err.response) {
			if (err.response.status === 401 && err.response.data === "Invalid access token") {
			
				try {
                    const body = {
                        refreshToken: USERFROMLS.refreshToken,
                        accessToken: USERFROMLS.accessToken
                    }

					const { data } = await API.post('auth/refresh-token', body);
					const accessToken = data?.data?.accessToken ? data?.data?.accessToken : null;
                    
					if (accessToken != null) {
                        localStorage.removeItem('nimfd-user');
                        localStorage.setItem('nimfd-user', JSON.stringify({ ...USERFROMLS, accessToken: data.data.accessToken }));
						instance.defaults.headers.common[
							'Authorization'
						] = accessToken;

					}
					return instance(originalConfig);
				} catch (_error) {
					if (_error.response.status === 401) {
                            alert('Session expired. Please login again!');
                            window.history.pushState({}, '', '/');
                            localStorage.removeItem('nimfd-user');
                            window.location.reload();
						return Promise.reject(_error.response.data);
					}
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export const API = instance