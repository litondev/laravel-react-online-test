import React from "react";
import {Redirect,Link} from "react-router-dom";

export default class Home extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isLoadingLogout : false,
			showSidebar : false
		}
	}

	componentDidMount(){
		window.$("body").addClass("sidebar-collapse");
	}

  	componentWillUnmount(){
  		window.$("body").removeClass("sidebar-collapse");
  	}

	onSidebar(){
		this.setState({
			showSidebar : !this.state.showSidebar
		})
	}

	onLogout(){
		if(this.state.isLoadingLogout){
			return false;
		}

		this.setState({
			isLoadingLogout : true
		})

		window.$axios.post("/logout")
		.then(res => {
			this.props.removeToken();
      		this.props.history.push('/signin')   
		})
		.catch(err => {
		 	if(err.response && err.response.status === 500){
		       	window.$toastr('error',err.response.data.message);
		    }else{
		        window.$toastr('error','Terjadi Kesalahan');
		   	}

		   	this.setState({
				isLoadingLogout : false
			})
		});	
	}

	render(){
		if(!this.props.token){
      		return <Redirect to="/signin"/>
		}

		let sidebarStyle = {
			zIndex: 2001,
			position : "absolute",
			top : 0,
			right : 0,
			left: 0,
			bottom:0
		}

		let menuSidebarStyle = {
			background : "white"
		}

		let sideMenuSidebarStyle = {
			background:"black",
			opacity : 0.3
		}

	    let ToastContainer = window.$ToastContainer;

		return (
			<>
			  <ToastContainer/>

			  <nav className="main-header navbar navbar-expand navbar-dark">
			  	<div className="container-fluid">
				    <ul className="navbar-nav">			  
				      <li className="nav-item d-none d-sm-inline-block">
				        <Link to="/home" 
				        	className="nav-link">
				        	Logo
				        </Link>
				      </li>			 
				    </ul>
			
				    <ul className="navbar-nav ml-auto">
				      <li className="nav-item">
				        <a className="nav-link" 
				        	onClick={() => this.onSidebar()}>
				          <i className="fas fa-th-large"></i>
				        </a>
				      </li>
				    </ul>
			    </div>
			  </nav>  

			  {this.state.showSidebar && 
			  	<>
			  	<div className="row ml-0 mr-0" style={sidebarStyle}>			  	
				  	<div className="d-none d-lg-block col-lg-8 col-12 h-100" style={sideMenuSidebarStyle}></div>
			  		<div className="col-lg-4 col-12 h-100 pl-4 pr-4 pt-3" style={menuSidebarStyle}>
		  				<div className="clearfix">
		  					<div className="float-left">
		  						Menu
		  					</div>
		  					<div className="float-right">
		 						<a className="text-dark" 
		 							onClick={() => this.onSidebar()}>
				          			<i className="fas fa-times"></i>
				        		</a>
		  					</div>
		  				</div> 

		  				<ul className="list-group border-0 mt-3">
		  					<li className="list-group-item border-0">
		  						<Link to="/home" className="text-dark">
		  							<i className="fas fa-home"></i> Home
		  						</Link>
		  					</li>
		  					<li className="list-group-item border-0">
		  						<Link to="/profil" className="text-dark">
		  							<i className="fas fa-user"></i> Profil
		  						</Link>		  				
		  					</li>
		  					<li className="list-group-item border-0">
		  						<Link to="/status" className="text-dark">
		  							<i className="fas fa-sun"></i> Status
		  						</Link>		  					
		  					</li>
		  					<li className="list-group-item border-0">
		  						<a href="#" className="text-dark"
		  							onClick={() => this.onLogout()}>
		  							<i className="fas fa-power-off"></i> Keluar
		  							{this.state.isLoadingLogout && ' . . . '}
		  						</a>		  			
		  					</li>
		  				</ul>
		  			</div>
		  	  	</div>
		  	  	</>
		  	  }

		  	  <div className="container-fluid pl-2 pr-2">
			 	{this.props.children}
			  </div>
			</>
		)
	}
}