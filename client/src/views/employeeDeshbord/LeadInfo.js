import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { Link } from 'react-router-dom';
import decoder from 'jwt-decode'
import axios from 'axios'
import BarChart from './BarChart'
import PieChart from './PieChart'

 class LeadInfo  extends React .Component{
      constructor(){
          super()
          this.state={
              leadWone:[
                  
                // {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                  //  {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'}
              ],
              leadLoss:[
                //  {name:'name', email:'email@gmail.com', contactNumber:"094102394", registerDate:'12-04-2019', discription:' lorem ipsu doller is the dummy text only for text  holder  ', nextFollowup:'12-05-2019'},
                

              ],
              totalRevinue:'',
              fromDate:'',
              toDate:'',
              fd:'',
              td:'',
              dateToDateRevinueValue:'',
          }
      }


     changeHandler=(event)=>{
      console.log(event.target.value)
      this.setState({
          [event.target.name]:event.target.value
      })
    }
    setClient =(id)=>{
      localStorage.setItem('detailsID', id)
    }
      
      componentDidMount(){
        let token=localStorage.getItem('superToken')
        let decoded =decoder(token)
        // lead  wone getting 
        axios.get('/api/leadWone/'+decoded._id)
        .then(data=>{
          console.log(data)
          this.setState({leadWone:data.data.leadWone})
        })
        .catch(err=>{
          console.log(err)
        })

        axios.get('/api/leadloss/'+decoded._id)
        .then(data=>{
          console.log(data)
          this.setState({leadLoss:data.data.leadLoss})
        })
        .catch(err=>{
          console.log(err)
        })

        console.log(this.state)
        
        // lead  wone getting 
        axios.get('/api/totalRevinue/'+decoded._id)
        .then(data=>{
          console.log(data)
          this.setState({totalRevinue:data.data.totalRevinue})
        })
        .catch(err=>{
          console.log(err)
        })
        



      }

      submiHandler=(event)=>{
          event.preventDefault()
        let token=localStorage.getItem('superToken')
        let decoded =decoder(token)
      console.log('doing')
        if(!this.state.fromDate){
          this.setState({
            fd:"Select From Date"
          })
          return
        }
        if(!this.state.toDate){
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
        
        // date to date revinue getting 
        axios.post('/api/dateToDateRevinue/'+decoded._id, obj)
        .then(data=>{
          console.log(data.data, "his is  the  data to dat rev")
          this.setState({
            fromDate:'',
            toDate:'',
            fd:'',
            td:'',
            dateToDateRevinueValue:data.data.dateToDateRevinue,
            
          })

        })
        .catch(err=>{
          console.log(err)
        })
        console.log(obj)
      }
     
     
        render(){
                
            return(
              <div>
                {console.log(this.state)}
                
                <Row className="mt-4 ml-3 mr-3">
                  <Col className="col-md-6 col-sm-12" >
                    <Card className="">
                      <CardHeader className="d-flex">
                        <h3>Lead Parformance </h3>
                        <p className='ml-3 mt-3'> ( Source )</p>
                      </CardHeader>
                      <CardBody className="">
                        
                                <Row form>
                                    <Col md="4" className="form-group">
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
                                    <Col md="4" className="form-group">
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
                                      <a  onClick={this.submiHandler} className="btn btn-info">Search</a>
                                    </Col>
                                </Row>
                                {this.state.dateToDateRevinueValue?
                                  <p className="text-warinig"> <span className="wone">Result Founded :</span> {this.state.dateToDateRevinueValue} </p>:""
                                }
                        <h5 className="wone">Total Revinue: {this.state.totalRevinue} </h5>
                         
                        <BarChart/>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="col-md-6 col-sm-12">
                    {/* lead  performance */}
                    <Card className="">
                      <CardHeader className="d-flex">
                        <h3>Lead Parformance  </h3>
                        <p className='ml-3 mt-3'> ( <span className="wone">Wone</span>  / <span className="loss">Loss</span>  )</p>
                      </CardHeader>
                      <CardBody>
                        <PieChart/>

                      </CardBody>

                    </Card>
                  </Col>
                </Row>
              <div className="ml-3 mr-3 mt-5 mb-5 overflow-hidden">
                  {this.state.leadWone.length==0?
                  <div className="card  pt-5 mt-5 pb-5 mb-5  ">
                      <h2 className="text-center pt-5 mt-5  mb-5 ">No Lead Existing</h2>
                      <p className="text-center pb-5">( Lead wone )</p>
                  </div>:
                  
              <Row>
                <Col>
                  <Card small className="mb-4">
                    <CardHeader className="border-bottom d-flex">
                      <h3 className="m-0">Lead Wone</h3>
                      <p className="mt-3 ml-3">( Last 30 day's )</p>
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
                            {this.state.leadWone.map(singleItem=>{
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
                                                  <a class="dropdown-item" href="#">Update Followup Time</a>
                                                  <a class="dropdown-item" href="#">Delete</a>
                                                  <a class="dropdown-item" href="#">Wone</a>
                                                  <a class="dropdown-item" href="#">Loss</a>
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
                <div className="ml-3 mr-3 mt-5 mb-5 overflow-hidden">
                    {this.state.leadLoss.length==0?
                    <div className="card  pt-5 mt-5 pb-5 mb-5  ">
                        <h2 className="text-center pt-5 mt-5  mb-5 ">No Lead Existing</h2>
                        <p className="text-center pb-5">( Lead Loss)</p>

                    </div>:
                    
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom d-flex">
                        <h3 className="m-0">Lead Loss</h3>
                        <p className="mt-3 ml-3">(Last 30 day's )</p>
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
                              {this.state.leadLoss.map(singleItem=>{
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
                                                    <a class="dropdown-item" href="#">Update Followup Time</a>
                                                    <a class="dropdown-item" href="#">Delete</a>
                                                    <a class="dropdown-item" href="#">Wone</a>
                                                    <a class="dropdown-item" href="#">Loss</a>
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

                </div>
            )
        }
     }
 

 export default LeadInfo