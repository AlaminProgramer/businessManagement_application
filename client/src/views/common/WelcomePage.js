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


 class WelcomePage  extends React .Component{

     constructor(){
         super()
         console.log('welcome')
     }
        render(){

            return(
                <div className="col-md-8 offset-md-2 mt mt-5 mt-5 mb-3">
                    <Card small className="mb-4 mt-5 mt-5 mt">
                        <CardHeader className="border-bottom  text-center">
                        <h3 className=" pt-5 pb-5 m-0 text-capitalize">Welcome to business management application</h3>
                            <p>Go to login  route for login </p>
                        </  CardHeader>
                    </Card>
                    
                </div>
            )
        }
     }
 

 export default WelcomePage
