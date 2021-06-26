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
		if(err.response && err.response.status === 401){
			if(err.response.data.message = "Token is expired"){
				console.log("Token is expired");

				return axios.post("/refresh")
				.then(res => {
					store.dispatch({
						type : "SET_TOKEN",
						token  : res.data.access_token
					})

					console.log("Success Refresh Token");

					console.log("Resend Original Request");

					return window.$axios(err.config)
				}).catch(error => {
					// sss
					if(error.response && error.response.status !== 401){
						throw error
					}else{
						console.log("Failed Refresh Token");
						store.dispatch({
							type : "REMOVE_TOKEN"
						})
					}
				});
			}else{
				console.log("Token is invalid");

				store.dispatch({
					type : 'REMOVE_TOKEN'
				});
			}
		}				

		throw err
	}
)

window.$axios = axios;