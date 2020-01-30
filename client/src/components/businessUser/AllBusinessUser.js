import React from 'react'
import { Card, CardHeader, CardBody } from 'shards-react'


class  AllBusinessUser extends React.Component{
    constructor(){
        super()
        this.state={
            AllBusinessUser:[
                {logo:'logo' , businessName:'alamin',email:'sample@gmail.com',contactNumber:'02930234',country:'Chayna',state:' none',city:'Kolkata',pincode:'988234'},

                {logo:'logo' , businessName:'Imran',email:'sample@gmail.com',contactNumber:'020941239921',country:'India',state:'Goa',city:'dhaka',pincode:'090234'},

                {logo:'logo' , businessName:'Imran',email:'sample@gmail.com',contactNumber:'020941239921',country:'India',state:'Goa',city:'dhaka',pincode:'090234'},
                {logo:'logo' , businessName:'Imran',email:'sample@gmail.com',contactNumber:'020941239921',country:'India',state:'Goa',city:'dhaka',pincode:'090234'},
                {logo:'logo' , businessName:'Imran',email:'sample@gmail.com',contactNumber:'020941239921',country:'India',state:'Goa',city:'dhaka',pincode:'090234'},
                {logo:'logo' , businessName:'Imran',email:'sample@gmail.com',contactNumber:'020941239921',country:'India',state:'Goa',country:'Rashia',city:'dhaka',pincode:'090234'}
            ]
        }
    }
    render(){
        return(
            <div>
                <Card>
                    <CardHeader>
                        <h3 className="m-0"> All Business User </h3>
                    </CardHeader>
                    <CardBody>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Contact</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Pincode</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.AllBusinessUser.map(singleUser=>(
                                    <tr>
                                        <td> {singleUser.logo} </td>
                                        <td> {singleUser.businessName} </td>
                                        <td> {singleUser.email} </td>
                                        <td> {singleUser.country} </td>
                                        <td> {singleUser.contactNumber} </td>
                                        <td> {singleUser.state} </td>
                                        <td> {singleUser.city} </td>
                                        <td> {singleUser.pincode} </td>
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

//  businessName:{
// 	email:{
//     contactNumber:{
//     country:{
//     state:{
//     country:{
//     city:{
//     pincode:{
// 	password:{
// 	date:{