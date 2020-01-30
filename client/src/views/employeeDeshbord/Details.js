import React from 'react'
import axios from  'axios'

import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    CardBody,
    Row,
    Col,
    Form,
    FormGroup,
    FormSelect,
    FormTextarea,
    Button
  } from "shards-react";
class Details extends React.Component {
    constructor(){
        super()
        this.state={
            clientDetailsID:"",
            client:[]
        }
    }
    componentDidMount(){
        axios.get('/api/singleclient/'+localStorage.getItem('detailsID'))
        .then(data=>{
            console.log(data)
            this.setState({
                client:data.data.user
            })
        })
        .catch(err=>{
            console.log(err)
        })
        console.log(this.state)

        
    }
    render(){
        return(
            <div className="col-md-8 offset-md-2 mt-5">
                <Card  >
                        <h3 className="text-center mt-5 mb-2">Client Details</h3>
                    <CardBody className="col-md-8 offset-md-2">
                        <li className="list-item"> Name: {this.state.client.name} </li>
                        <li className="list-item"> Email: {this.state.client.email} </li>
                        <li className="list-item"> ID:{this.state.client.ID} </li>
                        <li className="list-item"> Lead Soure:{this.state.client.leadSource} </li>
                        <li className="list-item"> Address: {this.state.client.address} </li>
                        <li className="list-item"> Contact Number: {this.state.client.contactNumber} </li>
                        <li className="list-item"> City: {this.state.client.city} </li>
                        <li className="list-item"> State: {this.state.client.state} </li>
                        <li className="list-item"> Zip: {this.state.client.zip} </li>
                        <li className="list-item"> Registerd Date: {this.state.client.createDate} </li>
                        <li className="list-item"> Description: {this.state.client.description} </li>
                        <li className="list-item"> Lead Result: {this.state.client.lead} </li>
                        <li className="list-item"> Budget: {this.state.client.budget} </li>
                        <li className="list-item"> Service / Product Name: {this.state.client.serviceName} </li>
                        {console.log(this.state)}
                    </CardBody>
                </Card>
                
            </div>
        )
    }
}

export default Details