import React from "react";
import Skeleton from "react-loading-skeleton";

export default function homeSekleton(){
	return (
		<>
			<div className="text-center mb-2">
				<Skeleton height={ 20 } width={ 200 } 
					className="mt-2 mb-2" />
			</div>
		
			<div className="mb-4">
				<Skeleton height={ 20 } width={ 400 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 200 } 
					className="ml-1 d-block d-lg-none" />
				<br/>
				<Skeleton height={ 20 } width={ 600 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 300 } 
					className="ml-1 d-block d-lg-none" />
			</div>

			<div className="mb-4">
				<Skeleton height={ 20 } width={ 600 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 250 } 
					className="ml-1 d-block d-lg-none" />
				<br/>
				<Skeleton height={ 20 } width={ 800 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 300 } 
					className="ml-1 d-block d-lg-none" />
			</div>

			<div className="mb-4">
				<Skeleton height={ 20 } width={ 400 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 200 } 
					className="ml-1 d-block d-lg-none" />
				<br/>
				<Skeleton height={ 20 } width={ 600 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 300 } 
					className="ml-1 d-block d-lg-none" />
			</div>

			<div className="mb-4">
				<Skeleton height={ 20 } width={ 600 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 250 } 
					className="ml-1 d-block d-lg-none" />
				<br/>
				<Skeleton height={ 20 } width={ 800 } 
					className="ml-1 d-none d-lg-block" />
				<Skeleton height={ 20 } width={ 300 } 
					className="ml-1 d-block d-lg-none" />
			</div>
		
			<div className="text-center">
				<Skeleton height={ 30 } width={ 150 } 
					className="ml-1" />
				<Skeleton height={ 30 } width={ 150 } 
					className="ml-1" />
			</div>
		</>
	)
}