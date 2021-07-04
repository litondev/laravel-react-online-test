import React from "react";
import TheImage from "../components/the-image.js";

export default class Maintaince extends React.Component{  
	constructor(props){
		super(props);

		document.title = "Maintaince";

		this.state = {
			isLoadingCheckMaintaince : false
		}
	}

	onCheckMaintaince(){
		if(this.state.isLoadingCheckMaintaince){
			return false;
		}

		this.setState({
			isLoadingCheckMaintaince : true
		});

		window.$axios.get("/check")
		.then(res => {			
			localStorage.removeItem("maintaince")
			window.location = "/";
		})
		.catch(err => {
			this.setState({
				isLoadingCheckMaintaince : false
			});

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

				<div className="text-center mt-3 animate__animated animate__fadeIn">
					Maintaince 

					<br/><br/>

					<TheImage
						src="/images/maintaince.png"
						style={{
							height : "325px",
							width : "325px",
							objectFit: "content"
						}} />

					<br/>
					
					<a href="#" onClick={() => this.onCheckMaintaince()}
						className="btn btn-my-test">
						Check Maintaince

						{ !this.state.isLoadingCheckMaintaince && 
							<> <i className="fa fa-redo"></i>  </>
						}

						{ this.state.isLoadingCheckMaintaince && 
							<> <i className="fa fa-circle-notch fa-spin"></i> </>
						}
					</a>
				</div>
			</>
		)
	}
}