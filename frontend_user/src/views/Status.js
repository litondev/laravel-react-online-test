import DefaultLayout from "../layouts/default.js";
import StatusSkeleton from "../components/status/StatusSkeleton.js";
import TheImage from "../components/the-image.js";
import React from "react";

export default class Status extends React.Component{
	constructor(props){
    	super(props);

    	document.title = "Status";

    	this.state = {
    		isLoadingStatus : true,
    		isLoadingAgainStatus : false,
    		filter : {},
    		search : {},
    		status : {},
    		pagination : {}
    	}
	}

	componentDidMount(){
		this.onLoad();
	}

	onLoad(){
		if(this.state.isLoadingAgainStatus){
			return false;
		}

		this.setState({	
			isLoadingAgainStatus : true
		});

		let queryParams = {
			...this.state.filter,
			...this.state.search,
			...this.state.pagination
		}

		window.$axios.get("/status",{
			params : queryParams
		})
		.then(res => {
			this.setState({
				isLoadingAgainStatus : false,			
				isLoadingStatus : false,
				status : res.data				
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

	onFilter(){
		this.setState({
			filter : {
				order_by : window.$("select[name=order_by]").val(),
				order : window.$("select[name=order]").val()
			}
		},() => {
			this.onLoad()
		})		
	}

	onSearch(event){
		let keyCode = event.charCode;

		this.setState({
			search : {	
				from_id : window.$("input[name=from_id]").val(),
				to_id : window.$("input[name=to_id]").val(),
				name : window.$("input[name=name]").val(),
				mapel : window.$("input[name=mapel]").val(),				
			},
			pagination : {
				page : 1
			}
		},() => {
			if(keyCode === 13){
			 	this.onLoad()
			}
		});
	}

	onPage(isNext = false){
		this.setState({
			pagination : {
				page : isNext ? (this.state.status.current_page + 1) : (this.state.status.current_page - 1) 
			}
		},() => {
			this.onLoad();
		});
	}

	onChoosePage(event){
		let value = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);				

		if(value > this.state.status.last_page || value < 0){
			return false;
		}	
	
		this.setState({
			pagination : {
				page : value
			},
			status : {
				...this.state.status,
				current_page : value
			}
		},() => {
			if(value > 0){
				this.onLoad()			
			}
		});
	}

	render(){
		return (
			<DefaultLayout { ...this.props }>
				<div className="container mt-4 p-4">
					{ this.state.isLoadingStatus && 
						<>
							<StatusSkeleton />
						</>
					}

					{ !this.state.isLoadingStatus && 
						<>
						<div className="mt-4 mb-4 clearfix">
							<div className="float-left">
								<div className="row m-0">
									<div className="col-md-5 mt-2">
										<select className="form-control"
											disabled={ this.state.isLoadingAgainStatus }
											name="order_by"
											onChange={ (event) => this.onFilter(event) }>
											<option value="id">Id</option>									
										</select>
									</div>

									<div className="col-md-7 mt-2">
										<select className="form-control"
											name="order"
											disabled={ this.state.isLoadingAgainStatus }
											onChange={ (event) => this.onFilter(event) }>
											<option value="desc">Terbesar</option>
											<option value="asc">Terkecil</option>
										</select>
									</div>
								</div>
							</div>
							<div className="float-right">
								<h2>Status</h2>
							</div>
						</div>

						<div className="mt-4 mb-4 row ml-0 mr-0">
							<div className="col-md-1 mt-2">
								<input type="text" placeholder="Dari Id" className="form-control"
									disabled={ this.state.isLoadingAgainStatus }
									name="from_id" 
									onKeyPress={ (event) => this.onSearch(event) }/>
							</div>
							<div className="col-md-1 mt-2">
								<input type="text" placeholder="Ke Id" className="form-control"
									disabled={ this.state.isLoadingAgainStatus }
									name="to_id"
									onKeyPress={ (event) => this.onSearch(event) }/>
							</div>
							<div className="col-md-3 mt-2">
								<input type="text" placeholder="Nama" className="form-control"
									disabled={ this.state.isLoadingAgainStatus }
									name="name"
									onKeyPress={ (event) => this.onSearch(event) }/>
							</div>
							<div className="col-md-3 mt-2">
								<input type="text" placeholder="Mapel" className="form-control"
									disabled={ this.state.isLoadingAgainStatus }
									name="mapel"
									onKeyPress={ (event) => this.onSearch(event) }/>
							</div>
						</div>			

						<div className="table-responsive">
							<table className="table table-hover">														
								<tbody>
									<tr>
										<td>Id</td>
										<td>Nama Test</td>
										<td>Mapel</td>
										<td>Tanggal Test</td>
										<td>Opsi</td>
									</tr>
									{
										this.state.status.data.map((item,index) => {
											return <tr key={ index }>
												<td>{ item.id }</td>
												<td>{ item.test.name }</td>
												<td>{ item.test.mapel }</td>
												<td>{ item.test.start_at } - { item.test.end_at }</td>
												<td>
													<button className="btn btn-primary"
														onClick={ () => this.props.history.push("/status/"+item.id) }>
														Detail
													</button>
												</td>
											</tr>
										})
									}

									{
										!Boolean(this.state.status.data.length) &&										
										<tr>
											<td colspan="100" className="text-center">
												<TheImage src="/images/not-found.png" 
													style={ { 
														maxHeight: 200,
														objectFit: "cover" 
													} }
													className="mt-3 mb-3"/>											

												Data Tidak Ditemukan
											</td>
										</tr>									
									}
								</tbody>									
							</table>						
						</div>
						
						<div className="clearfix">
							<div className="float-left mt-2">
								{ this.state.status.total } Total Data / { this.state.status.last_page } Total Page
							</div>

							<div className="float-right row m-0 p-0 mt-2">
								{ this.state.status.current_page > 1 &&
									<div className="col-2 mr-1">
										<button onClick={() => this.onPage(false)} className="btn btn-primary">
											{ this.state.isLoadingAgainStatus && '...' }
											{ !this.state.isLoadingAgainStatus && 'Prev' }
										</button>
									</div>
								}

								<div className="col-6 ml-1 mr-1">
									<input type="text" value={ this.state.status.current_page } className="form-control"
										onChange={ (event) => this.onChoosePage(event) }
										disabled={ this.state.isLoadingAgainStatus }/>
								</div>

								{ this.state.status.current_page < this.state.status.last_page &&
									<div className="col-2 ml-1">
										<button onClick={() => this.onPage(true)} className="btn btn-primary">
											{ this.state.isLoadingAgainStatus && '...' }
											{ !this.state.isLoadingAgainStatus && 'Next' }
										</button>
									</div>
								}
							</div>
						</div>							
						</>
					}
				</div>
			</DefaultLayout>
		)
	}
}