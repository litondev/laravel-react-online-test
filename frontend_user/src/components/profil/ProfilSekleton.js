import React from "react";
import Skeleton from "react-loading-skeleton";

export default function profilSekleton(){
	return (
		<>
			<div className="row m-0">
				<div className="col-lg-3 col-12 text-center">
					<Skeleton height={ 200 } width={ 200 } 
						className="mt-2 mb-2" />
				</div>

				<div className="col-lg-9 col-12">
					{[1,2,3,4].map(() => {
						return <>
						<Skeleton height={ 20 } width={ 250 } 
							className="d-none d-lg-block mt-2 mb-2" />

						<Skeleton height={ 35 } width={ "100%" } 
							className="d-none d-lg-block mt-2 mb-2" />

						<Skeleton height={ 20 } width={ 150 } 
							className="d-block d-lg-none mt-2 mb-2" />

						<Skeleton height={ 35 } width={ "100%" } 
							className="d-block d-lg-none mt-2 mb-2" />

							<br/>
						</>
					})}			
				</div>
			</div>
		</>
	)
}