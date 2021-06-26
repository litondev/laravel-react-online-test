import DefaultLayout from "../layouts/default.js";
import ProfilSekleton from "../components/profil/ProfilSekleton.js";
import React from "react";

export default class Profil extends React.Component{
	constructor(props){
    	super(props);

    	document.title = "Profil";

    	this.state = {
    		isLoadingProfil : true
    	}
	}

	componentDidMount(){
		window.$axios.get("/me")
		.then(res => {
			this.setState({
				isLoadingProfil : false
			});

			console.log(res);
		}).catch(err => {
			if(err.response && err.response.status === 500){
		       	window.$toastr('error',err.response.data.message);
		    }else{
		        window.$toastr('error','Terjadi Kesalahan');
		   	}
		});
	}

	render(){
		return (
			<DefaultLayout { ...this.props }>
				<div className="container mt-4 p-4">
					{ this.state.isLoadingProfil && 
						<>
							<ProfilSekleton />
						</>
					}
				</div>
			</DefaultLayout>
		)
	}
}