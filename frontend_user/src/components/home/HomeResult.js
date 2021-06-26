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
				
				{ !this.props.result.length &&
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

				{ this.props.result.length &&
					<>
						Ada Ujian Kawan
					</>
				}
			</>
    	)
    }
}