import React from "react";
import LazyLoad from "react-lazy-load";

export default function(props){
	return (			
	    <LazyLoad>
    		<img {...props}
			    onError={(evt) => {evt.target.src = "/images/not-found-image-full-screen.png"}}/>
		</LazyLoad>
	)
}