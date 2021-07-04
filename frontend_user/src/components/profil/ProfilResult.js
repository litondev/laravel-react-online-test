import React from "react";
import ProfilUpload from "./ProfilUpload.js";
import ProfilUpdate from "./ProfilUpdate.js";

export default class ProfilResult extends React.Component{ 
    render(){
    	return(
    		<>
    			<div className="row m-0">
    				<div className="col-lg-3 col-12 text-center">    					
    					<ProfilUpload 
                            { ...this.props } />
    				</div>

    				<div className="col-lg-9 col-12">
                        <ProfilUpdate 
                            { ...this.props } />  
                    </div>
    			</div>
    		</>
    	)
    }
}