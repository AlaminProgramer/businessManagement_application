import React from 'react'
import { Card, CardHeader, CardBody, Button } from 'shards-react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import decoder from 'jwt-decode'

class  AllEmployee extends React.Component{
    constructor(){
        super()
        this.state={
            businessUser:[]
        }
    }
    componentDidMount(){
        let id=  decoder(localStorage.getItem('superToken'))
        console.log(id)
        axios.get('/api/singleBusinessEmployee/'+ decoder(localStorage.getItem('superToken'))._id)
        .then(businessUser=>{
            console.log(businessUser)
            this.setState({
                businessUser:businessUser.data.employees
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    delete=(id)=>{
        console.log(id)
        axios.get('/api/deleteEmployee/'+id)
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err)

        })
        this.componentDidMount()
    }
    block =(id)=>{
        axios.get('/api/block/'+id)
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
        window.location.href='/allemployee'
    }
    render(){
        return(
            <div className=" col-md-10 ml-5 mr-5 mt-5">
                <Card className="mt-5">
                    <CardHeader className="d-flex">
                        <h3 className="m-0"> All Employee </h3>
                        <Link className="ml-auto" to="/addemployee" ><Button >Add New Employee</Button></Link>
                    </CardHeader>
                    <CardBody>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.businessUser.map(singleUser=>(
                                    <tr>
                                        <td> {singleUser.name} </td>
                                        <td> {singleUser.email} </td>
                                        <td> {singleUser.contactNumber} </td>
                                        <td>                                          
                                            <div class="btn-group">
                                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Action
                                            </button>
                                            <div class="dropdown-menu">
                                                <a onClick={this.delete.bind(this , singleUser._id)} class="dropdown-item" href="#">Delete</a>
                                                <a onClick={this.block.bind(this , singleUser._id)} class="dropdown-item" href="#"> {singleUser.block? " Un Block":"Block"} </a>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default AllEmployee