import DefaultLayout from "../layouts/default.js";
import React from "react";

export default class Status extends React.Component{
	constructor(props){
    	super(props);

    	document.title = "Status";
	}

	render(){
		return (
			<DefaultLayout {...this.props}>
				Status
			</DefaultLayout>
		)
	}
}