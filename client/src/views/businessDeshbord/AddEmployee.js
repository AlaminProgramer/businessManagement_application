import React from 'react'
import axios from 'axios'
import decoder from 'jwt-decode'
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";



 class AddEmployee  extends React .Component{
     constructor(){
         super()
         this.state={
             name:'',
             email:'',
             password:'',
             confirmPassword:'',
             contactNumber:'',
             err:{},
             done:""
         }
     }
     changeHandler=(event)=>{
         console.log(event.target.value)
         this.setState({
            [event.target.name]:event.target.value
         })
     }
     submitHandler=(event)=>{
         event.preventDefault()
        let obj={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            contactNumber:this.state.contactNumber
        }
         axios.post('/api/employeeRegister/'+decoder(localStorage.getItem('superToken'))._id, obj)
         .then(data=>{
             console.log(data)
             this.setState({
                 done:"Employee Registerd Successfull !"
             })
            setTimeout(() => {
                this.setState({
                name:'',
                email:'',
                password:'',
                confirmPassword:'',
                contactNumber:'',
                err:{
                    
                },
                done:""
                })
            }, 3000);
            return
         })
         .catch(err=>{
             console.log(err.response.data)
             if(!err.response){
                 return console.log("Error undefine")
             }
             if(err.response){

                this.setState({
                    err:err.response.data
                })
             }
             return
         })
         console.log(this.state)
     }
        render(){
                
            return(
                <div className="col-md-8 offset-md-2 mt-3 mb-3">
                    <Card small className="mb-4">
                        {this.state.done?
                        <span className="pt-5 mt-5 pb-5 mb-5">
                            <h2 className="text-center text-success"> {this.state.done} </h2>
                        </span>:
                        <span>

                        <CardHeader className="border-bottom">
                        <h3 className="m-0">Add Employee</h3>
                        </CardHeader>
                        <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                            <Col>
                            {/* firm started */}
                                <form onSubmit={this.submitHandler}>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feFirstName"> Name</label>
                                    <FormInput
                                        name="name"
                                        id="feFirstName"
                                        className={this.state.err.name?"is-invalid":''}
                                        placeholder="First Name"
                                        value={this.state.name}
                                        onChange={this.changeHandler}
                                    />
                                    
                                    {this.state.err.name?
                                    <span className="text-danger"> {this.state.err.name} </span>
                                    :''
                                    }
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feEmail">Email</label>
                                    <FormInput
                                        name="email"
                                        className={this.state.err.email?"is-invalid":''}
                                        type="email"
                                        id="feEmail"
                                        placeholder="Email Address"
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                        autoComplete="email"
                                    />
                                    
                                    {this.state.err.email?
                                    <span className="text-danger"> {this.state.err.email} </span>
                                    :''
                                    }
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <FormInput
                                        className={this.state.err.password?"is-invalid":''}
                                        name="password"
                                        value={this.state.password}
                                        id="password"
                                        placeholder="Password"
                                        onChange={this.changeHandler}
                                    />
                                    {this.state.err.password?
                                    <span className="text-danger"> {this.state.err.password} </span>
                                    :''
                                    }
                                    </Col>
                                    
                                    <Col md="4" className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <FormInput
                                        name="confirmPassword"
                                        className={this.state.err.confirmPassword?"is-invalid":''}
                                        value={this.state.confirmPassword}
                                        id="confirmPassword"
                                        placeholder="Confirm password"
                                        onChange={this.changeHandler}
                                    />
                                    {this.state.err.confirmPassword?
                                    <span className="text-danger"> {this.state.err.confirmPassword} </span>
                                    :''
                                    }
                                    </Col>
                                    
                                    <Col md="4" className="form-group">
                                    <label htmlFor="contact">Contact Number</label>
                                    <FormInput
                                        name="contactNumber"
                                        className={this.state.err.contactNumber?"is-invalid":''}
                                        value={this.state.contactNumber}
                                        id="contact"
                                        placeholder="Contact number"
                                        onChange={this.changeHandler}
                                    />
                                    
                                    {this.state.err.contactNumber?
                                    <span className="text-danger"> {this.state.err.contactNumber} </span>
                                    :''
                                    }
                                    </Col>
                                </Row>
                                <Button type="submit" theme="accent">Submit</Button>
                                </form>
                            </Col>
                            </Row>
                        </ListGroupItem>
                        </ListGroup>
                        </span>
                        }
                    </Card>
                    
                </div>
            )
        }
     }
 

 export default AddEmployee




 