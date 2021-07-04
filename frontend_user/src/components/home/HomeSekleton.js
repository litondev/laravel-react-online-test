import React from "react";
import Skeleton from "react-loading-skeleton";

export default function homeSekleton(){
	return (
		<>
			<div className="text-center mb-2">
				<Skeleton height={ 20 } width={ 200 } 
					className="mt-2 mb-2" />
			</div>

			<div className="row">
				{[1,2,3,4,5,6].map(() => {
					return <>
						<div className="col-4">
							<Skeleton height={ 200 } width={ "100%"} 
								className="mt-2 mb-2" />
						</div>
					</>
				})}
			</div>
		</>
	)
}