import React from "react";
import TheImage from "../the-image.js";

export default class ProfilUpload extends React.Component{ 
	constructor(props){
		super(props);

		this.state = {
			isLoadingUpload : false
		}
	}

	onUpload(evt){
		if(!evt.target.files.length){
			return false;
		}

		if(this.state.isLoadingUpload){
			return false;
		}

		this.setState({
			isLoadingUpload : true
		})

		let formData = new FormData(document.querySelector("form[name=form-upload]"));

		window.$("img[name=photo]").attr("src",URL.createObjectURL(evt.target.files[0]))		

		window.$axios.post("/profil/upload",formData)
		.then(res => {
			window.$toastr('success',"Berhasil Upload Foto");
		})
		.catch(err => {
			window.$("img[name=photo]").attr("src",this.props.result.photo);

      		if(err.response && err.response.status === 422){
	         	window.$toastr('error',err.response.data.error);
      		}else if(err.response && err.response.status === 500){
         		window.$toastr('error',err.response.data.message);
      		}else{
         		window.$toastr('error','Terjadi Kesalahan');
      		}
		})
		.finally(() => {
			this.setState({
        		isLoadingUpload : false
      		});
		});
	}

	render(){
		return (
			<form name="form-upload" encType="multipart/form-data">
				<TheImage 
					src={ this.props.result.photo } 
					style={ {
						height : 200,
						width : 200,
						objectFit : "cover",
					} }
					name="photo"/>

				<input type="file" className="d-none" name="photo"
					onChange={ (event) => this.onUpload(event) }/>

				<div className="btn btn-primary mt-3 d-inline-block" 
					onClick={() => window.$("input[name=photo]").trigger('click')}>
					Upload File { this.state.isLoadingUpload && ' . . . ' }
				</div>
			</form>	    		
		)
	}
}