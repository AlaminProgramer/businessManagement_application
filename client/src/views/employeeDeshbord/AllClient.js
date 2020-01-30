import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import decoder from 'jwt-decode'
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

 class AllClient  extends React .Component{
     constructor(){
         super()
         this.state={
           
          name:'',
          email:'',
          id:'',
          leadSource:'',
          contactNumber:'',
          address:'',
          city:'',
          state:'',
          zip:'',
          description:'',
          success:"",
          nextFollowUpDate:'',
          user:{},
          client:[],
          clientId:''
         }
     }
     
     
     componentDidMount(){
      let token=localStorage.getItem('superToken')
      let decoded =decoder(token)
        axios.get('/api/singleEmployeeClient/'+decoded._id)
        .then(client=>{
          console.log(client)
          this.setState({client:client.data.client})
        })
        .catch(err=>{
          console.log(err)
        })
     }

     setClient =(id)=>{
      localStorage.setItem('detailsID', id)
    }
    changeHandler=(event)=>{
      console.log(event.target.value)
      this.setState({
          [event.target.name]:event.target.value
      })
  }
  deleteClient=(id , event)=>{
    event.preventDefault()
   axios.get('/api/deleteClient/'+id)
   .then(data=>{
     console.log(data)
   })
   .catch(err=>{
     console.log(err)
   })
   this.componentDidMount()

  }
  submiHandler=(event)=>{
      event.preventDefault()
      
      let obj={
          
          name:this.state.name,
          email:this.state.email,
          ID:this.state.id,
          leadSource:this.state.leadSource,
          contactNumber:this.state.contactNumber,
          address:this.state.address,
          city:this.state.city,
          state:this.state.state,
          zip:this.state.zip,
          description:this.state.description,
          nextFollowUpDate:this.state.nextFollowUpDate
      }
      
      console.log(this.state)
      axios.post('/api/updateClient/'+this.state.clientId, obj)
      .then(data=>{
          console.log(data)
          this.setState({success:" Client Created Successfull !"})
          setTimeout(() => {
          console.log('success sms ')
              
          this.setState({
          name:'',
          email:'',
          id:'',
          leadSource:'',
          contactNumber:'',
          address:'',
          city:'',
          state:'',
          zip:'',
          description:'',
          success:"",
          nextFollowUpDate:''
          })
          }, 7000);
      })
      .catch(err=>{
          console.log(err.response.data)
          if(!err.response.data){
              return  console.log('Error undefine')
          }
          this.setState({
              err:err.response.data
          })
          console.log(this.state)

      })
      this.componentDidMount()
  }
     
     

     
  getData=( id, event)=>{
    event.preventDefault()
    
    axios.get('/api/singleclient/'+id)
    .then(data=>{
      this.setState({
        
        name:data.data.user.name,
        email:data.data.user.email,
        id:data.data.user.ID,
        leadSource:data.data.user.leadSource,
        contactNumber:data.data.user.contactNumber,
        address:data.data.user.address,
        city:data.data.user.city,
        state:data.data.user.state,
        zip:data.data.user.zip,
        description:data.data.user.description,
        nextFollowUpDate:data.data.user.nextFollowUpDate,
        clientId:id
      })
      console.log(this.state.user)
    })
    .catch(err=>{
      console.log(err)
    })
  }
     
     
        render(){
            return(
                <div className="ml-5 mr-5 mt-5 mb-5">
                  
                  {/* modal */}
                  <div>                                     
                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                  Launch demo modal
                </button> */}

                <div className="modal fade"  id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Update Information</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="">
                       
                <div className="">
                    <div small className="">
                        {this.state.success?
                             <h2 className="text-center "> {this.state.success} </h2>:
                             <>
                        <ListGroup flush>
                        <ListGroupItem className="">
                            <Row>
                            <Col>
                                <form onSubmit={this.submiHandler}>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="name"> Name</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.name}
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.changeHandler}
                                        
                                    />
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feLastName">ID</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.id}
                                        name="id"
                                        id="id"
                                        value={this.state.id}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feInputState"> lead source</label>
                                    <select className="form-control" value={this.state.leadSource}
                                     onChange={this.changeHandler} name="leadSource" id="feInputState">
                                        <option > {this.state.user.leadSource} </option>
                                        <option value="facebook">Facebook</option>
                                        <option value="local">Local</option>
                                        <option value="google">Google</option>
                                        <option value="linkdin">Linkdin</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="other">Other</option>
                                    </select>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.address}
                                        name="address"
                                        id="address"
                                        value={this.state.address}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="number">Contact number</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.contactNumber}
                                        name="contactNumber"
                                        type="number"
                                        value={this.state.contactNumber}
                                        id="number"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="nextFollowUpDate"> FollowUp </label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.nextFollowUpDate}
                                        name="nextFollowUpDate"
                                        value={this.state.nextFollowUpDate}
                                        type="date"
                                        id="nextFollowUpDate"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.city}
                                        id="city"
                                        value={this.state.city}
                                        name="city"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.state}
                                        id="state"
                                        name="state"
                                        onChange={this.changeHandler}
                                        value={this.state.state}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="Zip">Zip</label>
                                    <input
                                        className="form-control"
                                        defaultValue={this.state.user.zip}
                                        name="zip"
                                        value={this.state.zip}
                                        id="Zip"
                                        type="number"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="12" className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        defaultValue={this.state.user.description} 
                                        className="form-control"
                                        id="description" 
                                        rows="5" 
                                        value={this.state.description}
                                        onChange={this.changeHandler}
                                        name="description"
                                        value={this.state.description}
                                    />
                                    </Col>
                                </Row>
                                <button onClick={this.submiHandler.bind(this , )} type="button" class="btn btn-secondary" data-dismiss="modal">Submit</button>
                                </form>
                            </Col>
                            </Row>
                        </ListGroupItem>
                        </ListGroup>
                             </>
                        
                        }
                        
                        
                    </div>
                </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                       {/* MODAL END  */}

                    {this.state.client.length==0?
                    <div className="card  pt-5 mt-5 pb-5 mb-5  ">
                        <h1 className="text-center pt-5 mt-5 pb-5 mb-5 ">No  Client Founded</h1>
                    </div>:
                    
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom d-flex">
                        <h3 className="m-0">All Client</h3>
                        <p className="mt-3 ml-3">( Here included all client that's registered yet . )</p>
                        
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
                                View in details
                              </th>
                              <th scope="col" className="border-0">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                              {this.state.client.map(singleItem=>{
                                  return(
                                      
                                    <tr>
                                        <td> {singleItem.name} </td>
                                        <td> {singleItem.email} </td>
                                        <td> {singleItem.contactNumber} </td>
                                        <td> {singleItem.createDate} </td>
                                        <td> <Link onClick={this.setClient.bind(this ,singleItem._id)}  to='/details'>Details</Link> </td>

                                        <td>
                                            
                                        <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                   Action
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item" href="#"  data-toggle="modal" data-target="#exampleModal" onClick={this.getData.bind(this , singleItem._id)} >Update</a>
                                                    <button onClick={this.deleteClient.bind(this , singleItem._id)} class="dropdown-item" href="#">Delete</button>
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
 

 export default AllClient