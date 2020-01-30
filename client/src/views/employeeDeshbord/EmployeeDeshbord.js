import React from "react";
import { BrowserRouter , Route } from "react-router-dom";

import routes from "../../routes";
import withTracker from "../../withTracker";




import "bootstrap/dist/css/bootstrap.min.css";

import '../../assets/deshbord.css'


class EmployeeDeshbord extends React.Component{
    
    
     render(){
         return(
                        
            <BrowserRouter basename={process.env.REACT_APP_BASENAME || ""}>
            <div>
                {routes.map((route, index) => {
                return (
                    <>
                    
                    <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                        return (
                        <route.layout {...props}>
                            <route.component {...props} />
                        </route.layout>
                        );
                    })}
                    />
                    </>
                );
                })}
            </div>
            </BrowserRouter>
         )
     }
}
// );

export default EmployeeDeshbord