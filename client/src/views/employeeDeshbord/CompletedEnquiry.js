import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody  , ListGroupItem, ListGroup } from "shards-react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import decoder from 'jwt-decode'

 class CompletedEnquiry  extends React .Component{
     constructor(){
         super()
         this.state={
             todayEnquiry:[
                 
                //  {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'}
             ],
             
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
          clientId:'',

          
          totalEnquiry:'',
          fromDate:'',
          toDate:'',
          fd:'',
          td:'',
          fromDateTodateEnquiry:'',
          fromDateTodateEnquiryArray:[]
         }
     }
     componentDidMount(){
      
      let token=localStorage.getItem('superToken')
      let decoded =decoder(token)
      axios.get('/api/completedEnquiry/'+decoded._id)
      .then(clients=>{
        console.log(clients)
        this.setState({todayEnquiry:clients.data.todayEnquiry})
      })
      .catch(err=>{
        console.log(err)
      })
      axios.get('/api/totalEnquiry/'+decoded._id)
      .then(data=>{
        console.log(data)
        this.setState({
          totalEnquiry:data.data.totalEnquiry
        })
      })
      .catch(err=>{
        console.log(err)
      })
   }

   setClient =(id)=>{
     localStorage.setItem('detailsID', id)
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
    
    changeHandler=(event)=>{
      console.log(event.target.value)
      this.setState({
          [event.target.name]:event.target.value
      })
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
     
     
  getDateToDateEnquiry=(event)=>{
      event.preventDefault()
    let token=localStorage.getItem('superToken')
    let decoded =decoder(token)
  console.log(this.state)
    if(this.state.fromDate==''){
      this.setState({
        fd:"Select From Date"
      })
      return
    }
    if(this.state.toDate==''){
      this.setState({
        td:"Select To Date"
      })
      return
    }
    if(this.state.toDate>this.state.fromDate){
      let fdt=this.state.fromDate
      let tdt=this.state.toDate
      this.setState({
        fromDate:tdt,
        toDate:fdt
      })
    }
    let obj={
      fromDate:this.state.fromDate,
      toDate:this.state.toDate
    }
    
    // date to date enquiry getting 
    axios.post('/api/fromDateTodateEnquiry/'+decoded._id, obj)
    .then(data=>{
      console.log(data, "console log")
      this.setState({
        fromDate:'',
        toDate:'',
        fd:'',
        td:'',
        fromDateTodateEnquiry:data.data.dateToDateEnquiry,
        fromDateTodateEnquiryArray:data.data.enquiry
        
      })
      console.log(data.data.getDateToDateEnquiry)
    })
    .catch(err=>{
      console.log(err)
    })
    console.log(obj)
    console.log(this.state)

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
                <div className="ml-3 mr-3 mt-5 mb-5">
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
                    <div >
                      
                    {this.state.fromDateTodateEnquiryArray.length==0?
                    <div className="card  pt-5 mt-5 pb-5 mb-5  ">
                      
                              <div className="col-md-8 offset-md-2">
                      <Row className="ml-auto text-center" form>
                                      <Col md="5" className="form-group">
                                        <label htmlFor="fromDate">From Date</label>
                                        <input
                                            className={this.state.fd?"is-invalid  form-control":' form-control'}
                                            name="fromDate"
                                            value={this.state.fromDate}
                                            type="date"
                                            id="fromDate"
                                            placeholder="select date"
                                            onChange={this.changeHandler}
                                        />
                                      </Col>
                                      <Col md="5" className="form-group">
                                      <label htmlFor="toDate">To Date</label>
                                      <input
                                          name="toDate"
                                          value={this.state.toDate}
                                          type="date"
                                          className={this.state.td?"is-invalid  form-control":' form-control'}
                                          id="toDate"
                                          placeholder="select date"
                                          onChange={this.changeHandler}
                                      />
                                      </Col>
                                      <Col md="2" className="form-group">
                                      <label htmlFor="toDate" className="textl">.</label>
                                      <button onClick={this.getDateToDateEnquiry}  className="form-control"> Search </button>
                                      </Col>
                                      {this.state.fromDateTodateEnquiry?
                                        <h2 className="text-danger"> {this.state.fromDateTodateEnquiry} </h2>:''
                                      }
                                      
                                  </Row>
                                  </div>
                            
                    </div>:
                    
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom d-flex">
                        <h3 className="m-0">All Search Result</h3>

                              <Row className="ml-auto" form>
                                      <Col md="5" className="form-group">
                                        <label htmlFor="fromDate">From Date</label>
                                        <input
                                            className={this.state.fd?"is-invalid  form-control":' form-control'}
                                            name="fromDate"
                                            value={this.state.fromDate}
                                            type="date"
                                            id="fromDate"
                                            placeholder="select date"
                                            onChange={this.changeHandler}
                                        />
                                      </Col>
                                      <Col md="5" className="form-group">
                                      <label htmlFor="toDate">To Date</label>
                                      <input
                                          name="toDate"
                                          value={this.state.toDate}
                                          type="date"
                                          className={this.state.td?"is-invalid  form-control":' form-control'}
                                          id="toDate"
                                          placeholder="select date"
                                          onChange={this.changeHandler}
                                      />
                                      </Col>
                                      <Col md="2" className="form-group">
                                      <label htmlFor="number " className="cls">none</label>
                                        <a  onClick={this.getDateToDateEnquiry} className="btn btn-info">Search</a>
                                      </Col>
                                  </Row>
                            
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
                              {this.state.fromDateTodateEnquiryArray.map(singleItem=>{
                                  return(
                                      
                                    <tr>
                                        <td> {singleItem.name} </td>
                                        <td> {singleItem.email} </td>
                                        <td> {singleItem.contactNumber} </td>
                                        <td> {singleItem.createDate} </td>
                                        <td> {singleItem.nextFollowUpDate} </td>
                                        <td> <Link  to=''>Details</Link> </td>
                                        <td>
                                            
                                        <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                   Action
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a class="dropdown-item" href="#"  data-toggle="modal" data-target="#exampleModal" onClick={this.getData.bind(this , singleItem._id)} >Update</a>
                                                    <Link onClick={this.deleteClient.bind(this , singleItem._id)}  to="" class="dropdown-item" href="#">Delete</Link>
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
                    {this.state.todayEnquiry.length==0?
                    <div className="card  pt-5 mt-5 pb-5 mb-5  ">
                      
                      <CardHeader className="border-bottom d-flex">
                        <h3 className="m-0">Completed Enquiry</h3>
                        <button className="btn btn-primary ml-auto"> Add New client</button>

                      </CardHeader>
                        <h2 className="text-center pt-5 mt-5 pb-5 mb-5 ">No Enquiry Founded</h2>
                    </div>:
                    
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom d-flex">
                        <h3 className="m-0">All Enquiry</h3>
                            <p className="margin"> ( Today ) (Total Enquiry is :<span> {this.state.totalEnquiry} </span> )</p>


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
                                        <td> {singleItem.createDate} </td>
                                        <td> {singleItem.nextFollowUpDate} </td>
                                        <td> <Link onClick={this.setClient.bind(this ,singleItem._id)}  to='/details'>Details</Link> </td>
                                        <td>
                                            
                                        <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                   Action
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a class="dropdown-item" href="#"  data-toggle="modal" data-target="#exampleModal" onClick={this.getData.bind(this , singleItem._id)} >Update</a>
                                                    <Link onClick={this.deleteClient.bind(this , singleItem._id)}  to="" class="dropdown-item" href="#">Delete</Link>
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
 export default CompletedEnquiry



//  01684028160
//  01684028160
