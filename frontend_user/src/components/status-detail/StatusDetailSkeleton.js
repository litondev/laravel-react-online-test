import React from "react";
import Skeleton from "react-loading-skeleton";

export default function statusDetailSekleton(){
	return (
		<>		
			<div>
				<div className="clearfix">
					<div className="float-left">
						<Skeleton height={ 30 } width={ 400 } 
							className="mt-2 mb-2" />
					</div>
					<div className="float-right">
						<Skeleton height={ 30 } width={ 100 }
							className="mt-2 mb-2" />
					</div>
				</div>		

				<div className="row">
					<div className="col-md-3">
						<Skeleton height={ 30 } width={ "100%" }
							className="mt-2 mb-2" />
					</div>		
					<div className="col-md-3">
						<Skeleton height={ 30 } width={ "100%" }
							className="mt-2 mb-2" />
					</div>
				</div>
			</div>
		</>
	)
}