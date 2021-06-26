import DefaultLayout from "../layouts/default.js";
import React from "react";

export default class Profil extends React.Component{
	constructor(props){
    	super(props);

    	document.title = "Profil";
	}

	render(){
		return (
			<DefaultLayout {...this.props}>
				Profil
			</DefaultLayout>
		)
	}
}