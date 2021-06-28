import DefaultLayout from "../layouts/default.js";
import StatusDetailSkeleton from "../components/status-detail/StatusDetailSkeleton.js";
import React from "react";

export default class StatusDetail extends React.Component{
	constructor(props){
    	super(props);

    	let id = props.match.params.id;

    	if(isNaN(parseInt(id))){
    		props.history.push("/status")
    	}

    	document.title = "Status Detail";

    	this.state = {
    		isLoadingStatusDetail : true,
    		id : id 
    	}
	}

	componentDidMount(){
		window.$axios.get("/status/"+this.state.id)
		.then(res => {
			this.setState({
				isLoadingStatusDetail : false
			});

			console.log(res.data);
		})
		.catch(err => {
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
					{ this.state.isLoadingStatusDetail && 
						<>
							<StatusDetailSkeleton />
						</>
					}

					{ !this.state.isLoadingStatusDetail &&
						<>
							Loading Done
						</>
					}
				</div>
			</DefaultLayout>
		)
	}
}