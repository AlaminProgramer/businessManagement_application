import React from 'react'
import axios from 'axios'
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



 class Register  extends React .Component{
     constructor(){
         super()
         this.state={
             name:'',
             email:'',
             password:'',
             confirmPassword:'',
             contactNumber:'',
             err:{}
         }
     }
     changeHandler=(event)=>{
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
         axios.post('')
         console.log(this.state)
     }
        render(){
                
            return(
                <div className="col-md-8 offset-md-2 mt-3 mb-3">
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                        <h3 className="m-0">Register  Here</h3>
                        </CardHeader>
                        <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                            <Col>
                                <form onSubmit={this.submitHandler}>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feFirstName"> Name</label>
                                    <FormInput
                                        id="feFirstName"
                                        placeholder="First Name"
                                        value={this.state.name}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feEmail">Email</label>
                                    <FormInput
                                        type="email"
                                        id="feEmail"
                                        placeholder="Email Address"
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                        autoComplete="email"
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <FormInput
                                        name="password"
                                        value={this.state.password}
                                        id="password"
                                        placeholder="Password"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    
                                    <Col md="4" className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <FormInput
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        id="confirmPassword"
                                        placeholder="Confirm password"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    
                                    <Col md="r" className="form-group">
                                    <label htmlFor="contact">Contact Number</label>
                                    <FormInput
                                        name="contactNumber"
                                        value={this.state.contactNumber}
                                        id="contact"
                                        placeholder="Contact number"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Button type="submit" theme="accent">Register</Button>
                                </form>
                            </Col>
                            </Row>
                        </ListGroupItem>
                        </ListGroup>
                    </Card>
                    
                </div>
            )
        }
     }
 

 export default Register




 