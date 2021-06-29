import React from 'react';
import Routes from "./routers/index.js";
import TheLoading from "./components/the-loading.js";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import { connect } from "react-redux";

class App extends React.Component{
  constructor(props){
    super(props)

    if(window.location.pathname != "/maintaince" && localStorage.getItem("maintaince")){
      window.location = "/maintaince";              
    }

    if(window.location.pathname == "/maintaince" && !localStorage.getItem("maintaince")){
      window.location = "/";
    }
  }

  render(){ 
    if(window.location.pathname != "/maintaince" && localStorage.getItem("maintaince")){
      return <TheLoading/> 
    } 

    if(window.location.pathname == "/maintaince" && !localStorage.getItem("maintaince")){
      return <TheLoading/>
    }

    return (
        <BrowserRouter>   
          <React.Suspense fallback={ <TheLoading/> }>    
            <Switch>
            {
              Routes.map((route,indexRoute) => {
                return <Route
                  path={ route.path }
                  key={ indexRoute }
                  render={
                    (props) => 
                    <route.component
                      { ...props } 
                      { ...this.props } />
                  } />
              })
            }           
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      )
  }
}

const mapStateToProps = (state) => ({
  token : state.token,
});

const mapDispatchToProps = (dispatch) => ({
  setToken : (token) => {
      dispatch({
        "type" : "SET_TOKEN",
        "token"  : token     
      })
  },
  removeToken : () => {
    dispatch({
      "type" : "REMOVE_TOKEN",
    })
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(App);