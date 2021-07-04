import React from "react";
import Skeleton from "react-loading-skeleton";

export default function statusSekleton(){
	return (
		<>		
			<div>
				<div className="clearfix">	
					<div className="float-left">
						<Skeleton height={ 30 } width={ 200 }
							className="mt-2 mb-2" />
					</div>

					<div className="float-right">
						<Skeleton height={ 30 } width={ 100 }
							className="mt-2 mb-2" />
					</div>
				</div>				
		
				<Skeleton height={ 500 } width={ "100%" } 
					className="mt-2 mb-2" />
			</div>
		</>
	)
}