import React from 'react'
import EmployeeDeshbord from '../employeeDeshbord/EmployeeDeshbord'
import currentUser  from './currentuser'
import jwtDecode  from 'jwt-decode'
class SelectDeshbord extends React.Component{
    constructor(){
        super()
        this.state={
            type:''
        }
    }
    componentDidMount(){

        // if(!localStorage.getItem('superToken')){
        //     window.location.href='/welcome'
        // }
        // if(localStorage.getItem('superToken')){
        //     let decoded =jwtDecode(localStorage.getItem('superToken'))
        //      if(!decoded.type){
        //         window.location.href='/welcome'
        //     }
            
        // }
    }
    render(){
        return(
            <div>
               <EmployeeDeshbord/>
            </div>
        )
    }
}

export default SelectDeshbord