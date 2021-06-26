import DefaultLayout from "../layouts/default.js";
import HomeSekleton from "../components/sekleton/HomeSekleton.js";
import React from "react";

export default class Home extends React.Component{  
	constructor(props){
    	super(props);

    	document.title = "Home";

    	this.state = {
    		isLoadingUserTest : true
    	}
	}

	componentDidMount(){
		window.$axios.get("/home")
		.then(res => {
			this.setState({
				isLoadingUserTest : false
			})

			console.log(res.data);
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
		let homeContainerStyle = {
			border: "1px solid lightgray",
			minHeight: "400px",
		}

		return (
			<DefaultLayout {...this.props}>
				<div className="container mt-4 p-4" style={homeContainerStyle}>					
					{this.state.isLoadingUserTest && <HomeSekleton/>}

					{!this.state.isLoadingUserTest && 
						<>
							<div className="text-center">
								<div className="mt-2 mb-2 d-inline-block">
									Jadwal Ujian Anda Hari Ini
								</div>
							</div>
							
							<div className="text-center">
								<img src="images/not-found.png" 
									style={{maxHeight: 300,objectFit: "cover"}}
									className="d-none d-lg-inline-block mt-3 mb-3"/>
								<img src="images/not-found.png"
									className="d-block d-lg-none mt-3 mb-3 img-fluid"/>
								<br/>
								Jadwal Ujian Anda Hari Ini Tidak Ditemukan
							</div>
						</>
					}
				</div>
			</DefaultLayout>
		)
	}
}