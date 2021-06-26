import React from "react";
import LoadingOverlay from "react-loading-overlay";

export default function(){
	return (
		<LoadingOverlay
			active={true}
			text="Loading your content . . ."
			spinner>
			<div style={{height : '100vh'}}></div>
		</LoadingOverlay>	
	)
}