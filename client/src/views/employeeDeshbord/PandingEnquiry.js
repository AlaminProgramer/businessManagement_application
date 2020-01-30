import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Link } from 'react-router-dom';


 class PandingEnquiry  extends React .Component{
     constructor(){
         super()
         this.state={
             todayEnquiry:[
                 
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                //  {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'}
             ]

         }
     }
        render(){
                
            return(
                <div className="ml-3 mr-3 mt-5 mb-5 overflow-hidden">
                    {this.state.todayEnquiry.length==0?
                    <div className="card  pt-5 mt-5 pb-5 mb-5  ">
                        <h2 className="text-center pt-5 mt-5 pb-5 mb-5 ">No Panding Enquiry</h2>
                    </div>:
                    
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom d-flex">
                        <h3 className="m-0">Panding Enquiry</h3>
                        <button className="btn btn-primary ml-auto"> Add New client</button>

                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                                 Name
                              </th>
                              <th scope="col" className="border-0">
                                Email
                              </th>
                              <th scope="col" className="border-0">
                                Phone
                              </th>
                              <th scope="col" className="border-0">
                                Register Date
                              </th>
                              <th scope="col" className="border-0">
                                Next Follow Up
                              </th>
                              
                              <th scope="col" className="border-0">
                                View in details
                              </th>
                              <th scope="col" className="border-0">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                              {this.state.todayEnquiry.map(singleItem=>{
                                  return(
                                      
                                    <tr>
                                        <td> {singleItem.name} </td>
                                        <td> {singleItem.email} </td>
                                        <td> {singleItem.contactNumber} </td>
                                        <td> {singleItem.registerDate} </td>
                                        <td> {singleItem.nextFollowup} </td>
                                        <td> <Link to=''>Details</Link> </td>
                                        <td>
                                            
                                        <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                   Action
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item" href="#">Edite Information</a>
                                                    <a class="dropdown-item" href="#">Delete</a>
                                                    <a class="dropdown-item" href="#">Done</a>
                                                </div>
                                                </div>
                                         </td>
                                    </tr>
                                  )
                              })}
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
        }
                </div>
            )
        }
     }
 

 export default PandingEnquiry