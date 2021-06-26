import DefaultLayout from "../layouts/default.js";
import React from "react";

export default class Test extends React.Component{
	constructor(props){
    	super(props);

    	document.title = "Test";
	}

	render(){
		return (
			<DefaultLayout { ...this.props }>
				Test
			</DefaultLayout>
		)
	}
}