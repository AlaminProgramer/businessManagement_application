import React from 'react'
import { Card, CardHeader, CardBody, Button } from 'shards-react'
import {Link} from 'react-router-dom'
import axios from 'axios';

class  AllBusinessUser extends React.Component{
    constructor(){
        super()
        this.state={
            businessUser:[]
        }
    }
    componentDidMount(){
        axios.get('/api/businessusers/allBusinessUser')
        .then(businessUser=>{
            this.setState({
                businessUser:businessUser.data
            })
        })
    }
    render(){
        return(
            <div>
                <Card>
                    <CardHeader className="d-flex">
                        <h3 className="m-0"> All Business User </h3>
                        <Link className="ml-auto" to="/createBusinessUser" ><Button >Create</Button></Link>
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
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else here</a>
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
export default AllBusinessUser
