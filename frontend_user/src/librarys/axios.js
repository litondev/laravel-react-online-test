import axios from "axios";
import store from "../stores/index.js";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => { 	
  	config.headers['Authorization'] = localStorage.getItem('user-token') ? "Bearer "+localStorage.getItem("user-token") : null
  	return config;
});

axios.interceptors.response.use(
	res => res,
	err => {
		if(!err.response){
			throw err;
		}

		if(err.response.status !== 401){
			throw err;
		}
	
		if(!["Token is expired","Token telah kadaluwarsa"].includes(err.response.data.message)){
	 		store.dispatch({
	 			type : 'REMOVE_TOKEN'
	 		});

	 		throw err;
		}

		return axios.post("/refresh")
		.then(res => {	
			store.dispatch({
				type : "SET_TOKEN",
				token  : res.data.access_token
			});
		
			return window.$axios(err.config)
		});		
	}
)

window.$axios = axios;