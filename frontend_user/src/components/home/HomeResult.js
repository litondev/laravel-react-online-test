import React from "react";

export default class HomeResult extends React.Component{  
    render(){
    	return (
    		<>
				<div className="text-center">
					<div className="mt-2 mb-2 d-inline-block">
						Jadwal Ujian Anda Hari Ini
					</div>
				</div>
				
				{ !Boolean(this.props.result.length) &&
					<>
						<div className="text-center">
							<img src="images/not-found.png" 
								style={ { 
									maxHeight: 300,
									objectFit: "cover" 
								} }

								className="d-none d-lg-inline-block mt-3 mb-3"/>

							<img src="images/not-found.png"
								className="d-block d-lg-none mt-3 mb-3 img-fluid"/>

							<br/>	

							Jadwal Ujian Anda Hari Ini Tidak Ditemukan
						</div>
					</>
				}

				{ Boolean(this.props.result.length) &&
					<>
						<div className="row">
							{ this.props.result.map((item,index) => {
							return <>
								<div className="col-4">
									<div className="card">
										<div className="card-body">
											<div className="clearfix mb-3">
												<div className="float-left" 
													style={{ fontSize : "15px" }}>
													<b> Nama : </b> <br/>
													{ item.test.name }
												</div>
												<div className="float-right"
													style={{ fontSize : "14px" }}>	
													<b> Mapel : </b> <br/>
													{ item.test.mapel }
												</div>
											</div>

											<div style={{ fontSize : "13px" }}>						
												<b> Dimulai : </b> 
												<br/> 
												<span className="text-success">
													{ item.test.start_at }
												</span>
											</div>

											<div style={{ fontSize  : "13px" }}>
												<b> Berakhir :  </b> 
												<br/> 
												<span className="text-danger">
													{ item.test.end_at }
												</span>
											</div>

											<div className="clearfix">
												<div className="float-right">
													<button className="btn btn-my-test">
														<i className="fa fa-eye"></i> Detail
													</button>	
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
							})}
						</div>
					</>
				}
			</>
    	)
    }
}