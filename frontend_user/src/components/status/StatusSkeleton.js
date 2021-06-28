import React from "react";
import Skeleton from "react-loading-skeleton";

export default function statusSekleton(){
	return (
		<>		
			<div>
				<div className="clearfix">
					<div className="float-left">
						<Skeleton height={ 30 } width={ "40%" } 
							className="mt-2 mb-2" />
					</div>
					<div className="float-right">
						<Skeleton height={ 30 } width={ 100 }
							className="mt-2 mb-2" />
					</div>
				</div>				

				<Skeleton height={ 40 } width={ "50%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />

				<Skeleton height={ 50 } width={ "100%" } 
					className="mt-2 mb-2" />
			</div>
		</>
	)
}