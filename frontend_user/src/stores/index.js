import { createStore } from "redux";

let states = {
	token : localStorage.getItem('user-token') || null,
}

function App(state = states,action){
	switch(action.type){		
		case "REMOVE_TOKEN" :
			localStorage.removeItem('user-token');

			return {
				...state,
				token : null
			}
		case "SET_TOKEN" :
		 	localStorage.setItem('user-token',action.token);
	
			return {
				...state,
				token : action.token
			};		
		default : 
			return state
	}
}

export default createStore(App);