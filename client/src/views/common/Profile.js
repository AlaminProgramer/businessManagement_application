import axios  from 'axios'
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

import {Link} from 'react-router-dom'

import React from 'react'
import jwtdecode from 'jwt-decode'

class EmployeeProfile extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            password:'',
            prevPassword:'',
            massage:"",
            er1:'',
            er2:'',
            pname:'',
            pemail:'',
            done:''
        }
    }
    componentDidMount(){
        const decoded= jwtdecode(localStorage.getItem('superToken'))
        console.log(decoded)
        this.setState({

            pname:decoded.email,
            pemail:decoded.name,
        })
    }

    changeHandler=(event)=>{
        event.preventDefault()
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitHandler =(event)=>{
        event.preventDefault()
        if(!this.state.password){
            this.setState({
                er1:"need"
            })
            return
        }
        
        if(!this.state.prevPassword){
            this.setState({
                er2:"need"
            })
            return
        }
        let obj= {
            type:jwtdecode(localStorage.getItem('superToken')).type,
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            prevPassword:this.state.prevPassword
        }
        axios.post('/api/updateProfile/'+jwtdecode(localStorage.getItem('superToken'))._id, obj)
        .then(res=>{
            this.setState({done:"Updated Successfull !"})
            setTimeout(() => {
                this.setState({
                    done:''
                    
                })
                localStorage.removeItem('superToken')
                window.location.href='/login'
                
            }, 3000);
        })
        .catch(err=>{
            console.log(err)
            if(!err.response){
                console.log("Error undefine")
            }
            this.setState({
                massage:err.response.massage
            })
        })
    }

    render(){
        return(
            <div className="row">

            <div className="col-md-4 offset-md-4 mt-5 text-conter"> 
                         
                <Card small className="mb-4 pt-3">
                    <CardBody className="border-bottom text-center">
                    <div className="mb-3 mx-auto">
                        <img/>
                    </div>
                    <h4 className="mb-0"> {this.state.pname} </h4>
                    <span className="text-muted d-block mb-2"> {this.state.pemail} </span>
                    </CardBody>
                </Card>     
                <Card small className="mb-4 pt-3">
                    <div>
                        {this.state.done?
                        <h2 className="pt-5 pb-5 mt-5 mb-5"> {this.state.done} </h2>
                        :
                        <span>

                    <CardHeader>
                        <h3>Update Profile</h3>
                    </CardHeader>
                    <form className="p-3" onSubmit={this.submitHandler}>
                        <div className="form-gruop-item">
                            <label>Name</label>
                            <input 
                                className="form-control" 
                                value={this.state.name}
                                onChange={this.changeHandler}
                                name="name"
                                placeholder="Name"
                                type="text"
                            />
                        </div>
                        <div className="form-gruop-item">
                            <label>Email</label>
                            <input 
                                className="form-control" 
                                value={this.state.email}
                                onChange={this.changeHandler}
                                name="email"
                                placeholder="Email"
                                type="email"
                            />
                        </div>
                        <div className="form-gruop-item">
                            <label>New password</label>
                            <input 
                                className={this.state.er1?"form-control is-invalid":"form-control"} 
                                value={this.state.password}
                                onChange={this.changeHandler}
                                name="password"
                                placeholder="New password"
                                type="password"
                            />
                        </div>
                        <div className="form-gruop-item">
                            <label>Old password</label>
                            <input 
                                className={this.state.er2?"form-control is-invalid":"form-control"}
                                value={this.state.prevPassword}
                                onChange={this.changeHandler}
                                name="prevPassword"
                                placeholder="Old password"
                                type="password"
                            />
                            {
                                this.state.massage?
                                <p className="text-danger"> {this.state.massage} </p>
                                :''
                            }
                        </div>
                        <button className="btn btn-success mt-3 mb-3"  type="submit"> Update password</button>
                    </form>
                        </span>
                        }
                    </div>
                </Card>
            </div>
            </div>
        )
    }
}

export default EmployeeProfile