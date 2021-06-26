import DefaultLayout from "../layouts/default.js";
import HomeSekleton from "../components/home/HomeSekleton.js";
import HomeResult from "../components/home/HomeResult.js";
import React from "react";

export default class Home extends React.Component{  
	constructor(props){
    	super(props);

    	document.title = "Home";

    	this.state = {
    		isLoadingUserTest : true,
    		resultUserTest : []
    	}
	}

	componentDidMount(){
		window.$axios.get("/home")
		.then(res => {
			this.setState({
				isLoadingUserTest : false,
				resultUserTest : res.data
			})		
		})
		.catch(err => {
			if(err.response && err.response.status === 500){
		       	window.$toastr('error',err.response.data.message);
		    }else{
		        window.$toastr('error','Terjadi Kesalahan');
		   	}
		})
	}

	render(){
		return (
			<DefaultLayout { ...this.props }>
				<div className="container mt-4 p-4">					

					{ this.state.isLoadingUserTest && 
						<>
							<HomeSekleton />
						</>
					}

					{ !this.state.isLoadingUserTest && 
						<>
							<HomeResult 
								result={ this.state.resultUserTest } />
						</>
					}
				</div>
			</DefaultLayout>
		)
	}
}