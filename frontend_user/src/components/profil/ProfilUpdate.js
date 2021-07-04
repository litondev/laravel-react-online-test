import React from "react";

export default class ProfilUpdate extends React.Component{ 
	constructor(props){
        super(props);

        this.state = {
          fields : {
            name : props.result.name,
            number : props.result.number,
            password : '',
            password_confirm : ''
          },
          errors : {},
          isLoadingUpdate : false
        }

        this.form = new window.$ReactFormInputValidation(this);

        this.form.useRules({
          name : "required",
          number : "required",
          password : "min:8",
          password_confirm : "required|min:8"
        });

        this.form.onformsubmit = this.onUpdate.bind(this);
    }    

    onUpdate(fields){
        if(this.state.isLoadingUpdate){
          return false;
        }

        this.setState({
          isLoadingUpdate : true
        });

        window.$axios.post("/profil/update",fields)
        .then(res => {
          window.$toastr('success','Berhasil Update Profil');
        })
        .catch(err => {          
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
            isLoadingUpdate : false
          });
        });
    }

    render(){
    	return (
    	  <form onSubmit={ this.form.handleSubmit }>
            <div className="input-group mb-3">
              <label for="name" className="d-block w-100">Nama : </label>

              <input type="text"
                className={
                    this.state.errors.name
                    ? 'is-invalid form-control' 
                    : 'form-control'
                } 
                placeholder="Name"
                name="name"
                onChange={ this.form.handleChangeEvent }
                value={ this.state.fields.name }/>                            

              {
                !this.state.errors.name
                ?
                <div className="text-muted d-block w-100">
                  Masukan Nama Anda
                </div>
                : 
                <div className="invalid-feedback">
                  { this.state.errors.name }
                </div>
              }
            </div>

            <div className="input-group mb-3">
              <label for="number" className="d-block w-100">Nomor : </label>

              <input type="number" 
                className={
                    this.state.errors.number 
                    ? 'is-invalid form-control' 
                    : 'form-control'
                } 
                placeholder="Number"
                name="number"
                onChange={ this.form.handleChangeEvent }
                value={ this.state.fields.number }/>                                            

              {
                !this.state.errors.number
                ?
                <div className="text-muted d-block w-100">
                  Masukan Nomor Anda
                </div>
                : 
                <div className="invalid-feedback">
                  { this.state.errors.number }
                </div>
              }
            </div>

            <div className="input-group mb-3">
              <label for="password" className="d-block w-100">Password : </label>

              <input type="password" 
                className={
                  this.state.errors.password 
                  ? 'is-invalid form-control' 
                  : 'form-control'
                } 
                placeholder="Password"
                name="password"
                onChange={ this.form.handleChangeEvent }
                value={ this.state.fields.password }/>
              
              {
                !this.state.errors.password
                ?
                <div className="text-muted d-block w-100">
                  Masukan Password Anda
                </div>
                : 
                <div className="invalid-feedback">
                  { this.state.errors.password }
                </div>
              }
            </div>

            <div className="input-group mb-3">
              <label for="password_confirm" className="d-block w-100">Password Konfirmasi : </label>

              <input type="password" 
                className={
                  this.state.errors.password_confirm 
                  ? 'is-invalid form-control' 
                  : 'form-control'
                } 
                placeholder="Password Konfirmasi"
                name="password_confirm"
                onChange={ this.form.handleChangeEvent }
                value={ this.state.fields.password_confirm }/>
              
              {
                !this.state.errors.password_confirm
                ?
                <div className="text-muted d-block w-100">
                  Masukan Password Konfirmasi Anda
                </div>
                : 
                <div className="invalid-feedback">
                  { this.state.errors.password_confirm }
                </div>
              }
            </div>

            <div className="row">               
              <div className="col-4">
               { this.state.isLoadingUpdate && 
                <button className="btn btn-my-test btn-block">
                  <i class="fa fa-circle-notch fa-spin"></i>
                </button>
               }

               { !this.state.isLoadingUpdate &&
                <button className="btn btn-my-test btn-block"  type="submit">
                  Update
                </button>
               }
              </div>
            </div>
        </form>  
    	)
    }
}