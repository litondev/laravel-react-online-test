import React from "react";

export default class Maintaince extends React.Component{  
	onCheckMaintaince(){
		window.$axios.get("/check")
		.then(res => {			
			localStorage.removeItem("maintaince")
			window.location = "/";
		})
		.catch(err => {
		 	if(err.response && err.response.status === 500){
        		window.$toastr('error',err.response.data.message);
      		}else if(err.response && err.response.status === 503){
      			window.$toastr('error','Still Maintaince');
      		}else{
         		window.$toastr('error','Terjadi Kesalahan');
      		}
		})		
	}

	render(){
		let ToastContainer = window.$ToastContainer;

		return (
			<>
				<ToastContainer/>
				<div className="text-center mt-3">
					Maintaince <br/>
					<a href="#" onClick={() => this.onCheckMaintaince()}>
						Check Maintaince
					</a>
				</div>
			</>
		)
	}
}