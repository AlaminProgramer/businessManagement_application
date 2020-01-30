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


 class Login  extends React .Component{
     constructor(){
         super()
         this.state={
             email:'',
             password:'', 
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
         const obj={email:this.state.email , password:this.state.password}
         axios.post('/api/login', obj)
         .then(result=>{
             console.log(result)
             localStorage.setItem('superToken', result.data.token)
             
         })
         .catch(err=>{
             this.setState({err:err.response.data})
         })

     }
        render(){

            return(
                <div className="col-md-4 offset-md-4 mt mt-5 mt-5 mb-3">
                    <Card small className="mb-4 mt-5 mt-5 mt">
                        <CardHeader className="border-bottom ">
                        <h3 className="m-0">Login Here</h3>
                        </CardHeader>
                        <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                            <Col>
                                <form onSubmit={this.submitHandler}>
                                <Row form>
                                    <Col  className="form-group col-md-10 offset-md-1">
                                    <label htmlFor="email"> Email</label>
                                    <FormInput
                                        className={this.state.err.email?"is-invalid":''}
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        value={this.state.value}
                                        onChange={this.changeHandler}
                                    />
                                    {this.state.err.email?
                                    <span className="text-danger"> {this.state.err.email} </span>:''
                                    }
                                    </Col>

                                    <Col  className="form-group col-md-10 offset-md-1">
                                    <label htmlFor="password">Password</label>
                                    <FormInput
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.changeHandler}
                                        className={this.state.err.password?"is-invalid":''}
                                    />
                                    {this.state.err.password?
                                    <p className="text-danger"> {this.state.err.password} </p>:''
                                    }
                                    {this.state.err.massage?
                                    <p className="text-danger"> {this.state.err.massage} </p>:''
                                    }
                                    </Col>
                                    
                                </Row>
                                <button type="submit" className="btn btn-info">Login</button>
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
 

 export default Login
