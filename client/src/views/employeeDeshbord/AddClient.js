import React from 'react'
import axios from 'axios'
import decoder from 'jwt-decode'
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


 class AddClient  extends React .Component{


    constructor(){
        super()
        console.log('constructor')
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
            createDate:'',
            budget:'',
            serviceName:'',
            err:{}
        }
    }
    changeHandler=(event)=>{
        console.log(event.target.value)
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    componentDidMount(){
        let today =new Date()
        let dd=String(today.getDate())
        let mm=String(today.getMonth())
        let yy=String(today.getFullYear())
        mm=parseInt(mm)
        mm=mm+1
        if(dd<10){
             dd='0'+dd
        }
        if(mm<10){
             mm='0'+mm
        }
        let createdDate=yy+'-'+mm+'-'+dd
        console.log(createdDate)
        this.setState({createDate:createdDate})
    }
    submiHandler=(event)=>{
        event.preventDefault()
        
        let today =new Date()
        let dd=String(today.getDate())
        let mm=String(today.getMonth())
        let yy=String(today.getFullYear())
        mm=parseInt(mm)
        mm=mm+1
        if(dd<10){
             dd='0'+dd
        }
        if(mm<10){
             mm='0'+mm
        }
        let createdDate=yy+'-'+mm+'-'+dd
        this.setState({createDate:createdDate})

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
            nextFollowUpDate:this.state.nextFollowUpDate,
            createDate:this.state.createDate,
            serviceName:this.state.serviceName,
            budget:this.state.budget

        }
        
        console.log(this.state)
        axios.post('/api/createNewClient/'+decoder(localStorage.getItem('superToken'))._id,obj )
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
                nextFollowUpDate:'',
                createDate:'',
                budget:'',
                serviceName:'',
                err:{}
            })
            }, 2000);
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
    }
        render(){
                
            return(
                <div className="col-md-8 mt-5 offset-md-2 mt-3 mb-3">
                    <Card small className="mb-4">
                        {this.state.success?
                             <h2 className="text-center pt-5 pb-5 mt-2 mb-2 "> {this.state.success} </h2>:
                             <>

                        
                    <CardHeader className="border-bottom">
                        <h3 className="m-0">Register new client</h3>
                        </CardHeader>
                        <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                            <Col>
                                <form onSubmit={this.submiHandler}>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="name"> Name</label>
                                    <FormInput
                                        className={this.state.err.name?"is-invalid":''}
                                        name="name"
                                        id="name"
                                        placeholder=" Name"
                                        value={this.state.name}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feLastName">ID</label>
                                    <FormInput
                                        className={this.state.err.ID?"is-invalid":''}
                                        name="id"
                                        id="id"
                                        placeholder="id"
                                        value={this.state.id}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <FormInput
                                        className={this.state.err.email?"is-invalid":''}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email Address"
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    
                                    <Col md="6" className="form-group">
                                    <label htmlFor="feInputState">Select lead source</label>
                                    <FormSelect 
                                    className={this.state.err.leadSource?"is-invalid":''}
                                     onChange={this.changeHandler} name="leadSource" id="feInputState">
                                        <option >Choose...</option>
                                        <option value="google">Google</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="youTube">YouTube</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="linkdin">Linkdin</option>
                                        <option value="local">Local</option>
                                        <option value="other">Other</option>
                                    </FormSelect>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <FormInput
                                        className={this.state.err.address?"is-invalid":''}
                                        name="address"
                                        id="address"
                                        placeholder="Address"
                                        value={this.state.address}
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="number">Contact number</label>
                                    <FormInput
                                        className={this.state.err.contactNumber?"is-invalid unstyled":'unstyled'}
                                        name="contactNumber"
                                        type="number"
                                        value={this.state.contactNumber}
                                        id="number"
                                        placeholder="Contact number"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="nextFollowUpDate"> Select next follow up date</label>
                                    <input
                                        className={this.state.err.nextFollowUpDate?"is-invalid  form-control":' form-control'}
                                        name="nextFollowUpDate"
                                        value={this.state.nextFollowUpDate}
                                        type="date"
                                        id="nextFollowUpDate"
                                        placeholder="Next FollowUp Date"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="city">City</label>
                                    <FormInput
                                        className={this.state.err.city?"is-invalid":''}
                                        id="city"
                                        value={this.state.city}
                                        placeholder="City"
                                        name="city"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                    <Col md="4" className="form-group">
                                    <label htmlFor="state">State</label>
                                    <FormInput
                                        className={this.state.err.state?"is-invalid":''}
                                        id="state"
                                        placeholder="State"
                                        name="state"
                                        onChange={this.changeHandler}
                                        value={this.state.state}
                                    />
                                    </Col>
                                    <Col md="2" className="form-group">
                                    <label htmlFor="Zip">Zip</label>
                                    <FormInput
                                        className={this.state.err.zip?"is-invalid":''}
                                        name="zip"
                                        value={this.state.zip}
                                        id="Zip"
                                        type="number"
                                        placeholder="Zip"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                
                                <Row form>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="serviceName">Product / service name</label>
                                    <FormInput
                                        className={this.state.err.serviceName?"is-invalid":''}
                                        id="serviceName"
                                        placeholder="serviceName"
                                        name="serviceName"
                                        onChange={this.changeHandler}
                                        value={this.state.serviceName}
                                    />
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <label htmlFor="budget">Budget</label>
                                    <FormInput
                                        className={this.state.err.budget?"is-invalid":''}
                                        name="budget"
                                        value={this.state.budget}
                                        id="budget"
                                        type="number"
                                        placeholder="budget"
                                        onChange={this.changeHandler}
                                    />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="12" className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <FormTextarea 
                                        id="description" 
                                        className={this.state.err.description?"is-invalid":''}
                                        rows="5" 
                                        value={this.state.description}
                                        onChange={this.changeHandler}
                                        name="description"
                                        value={this.state.description}
                                    />
                                    </Col>
                                </Row>
                                <Button theme="accent">Submit</Button>
                                </form>
                            </Col>
                            </Row>
                        </ListGroupItem>
                        </ListGroup>
                             </>
                        
                        }
                        
                        
                    </Card>
                </div>
            )
        }
     }
 

 export default AddClient
