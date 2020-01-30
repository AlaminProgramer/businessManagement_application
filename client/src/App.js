import React from "react";
import { BrowserRouter , Route, Redirect } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";

import './assets/deshbord.css'

import SelectDeshbord from "./views/common/SelectDeshbord";

import Login from './views/common/Login'

import currentUser  from '../src/views/common/currentuser'

import decoder from 'jwt-decode'

import WelcomePage from './views/common/WelcomePage'



class App extends React.Component {
  constructor(){
    super()
    // if(!currentUser){
    //   window.location.replace('/welcome');
    // }
  }
  render(){
    return(
        <BrowserRouter>
          <div>
            <Route path="/login" component={Login} /> 
            {currentUser?
              <SelectDeshbord/>:
              <Redirect to='/login' component={Login}/>
              
            }
          </div>
        </BrowserRouter>
    )
  }
}

export default App