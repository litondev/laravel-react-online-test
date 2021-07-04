import React from "react";
import { Redirect } from "react-router-dom";

export default class Signin extends React.Component{
  constructor(props){
    super(props);

    document.title = "Signin";

    this.state = {
      fields : {
        number : '',
        password : ''
      },
      errors : {},
      isLoadingSignin : false,
      isInvalid : true
    }

    this.form = new window.$ReactFormInputValidation(this);

    this.form.useRules({
      number : "required",
      password : "required|min:8"
    });

    this.form.onformsubmit = this.onSignin.bind(this);
  }

  componentDidMount(){  
    window.$("body").attr({"style" : "none"});   
    window.$("body").removeClass("sidebar-collapse");
    window.$("body").addClass("hold-transition login-page");             
  } 

  componentWillUnmount(){
  }
  
  onSignin(fields){    
    if(this.state.isLoadingSignin){
      return false;
    }

    this.setState({
      isLoadingSignin : true
    });

    window.$axios.post("/signin",fields)
    .then(res => {
      window.$toastr('success','Berhasil Masuk');

      this.props.setToken(res.data.access_token);   
      
      this.props.history.push('/home')   
    })
    .catch(err => {   
      this.setState({
        isLoadingSignin : false
      });

      if(err.response && err.response.status === 422){
         window.$toastr('error',err.response.data.error);
      }else if(err.response && err.response.status === 500){
         window.$toastr('error',err.response.data.message);
      }else{
         window.$toastr('error','Terjadi Kesalahan');
      }
    })
  }

	render(){
    if(this.props.token){
      return <Redirect to="/home"/>
    }

    let ToastContainer = window.$ToastContainer;
      
		return (
			<div className="login-box animate__animated animate__fadeIn">
        <ToastContainer/>

        <div className="login-logo">
          <b>Admin</b>LTE
        </div>

        <div className="card">
          <div className="card-body login-card-body">

            <p className="login-box-msg">
              Sign in to start your session
            </p>

            <form onSubmit={ this.form.handleSubmit }>

              <div className="input-group mb-3">

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

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-list"></span>
                  </div>
                </div>                                

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

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
                
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

              <div className="row">               
                <div className="col-12 text-right">
                 { this.state.isLoadingSignin && 
                  <button className="btn btn-my-test">
                    <i className="fa fa-circle-notch fa-spin"></i>
                  </button>
                 }

                 { !this.state.isLoadingSignin &&
                  <button className="btn btn-my-test"  type="submit">
                    Sign In
                  </button>
                 }
                </div>
              </div>
            </form>        
          </div>
        </div>
      </div>
		)
	}
}