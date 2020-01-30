const validator=require('validator')
const registervalidator =(info)=>{
    
    const err={}
    if(!info.name){
        err.name="Name Requird"
    }
    if(!info.email){
        err.email="Email Requird"
    } else if(!validator.default.isEmail(info.email)){
        err.email="Email Not Valid "
    }
    if(!info.password){
        err.password="Password Requird"
    } else if(info.password.length <6){
        err.password="Password Length should be gatter then 6 Charecter"
    }
    if(!info.confirmPassword){
        err.confirmPassword="Confirm Password Requird"
    }else  if(info.confirmPassword !== info.password){
        err.confirmPassword="Both Password Are Different"
    }
    if(!info.contactNumber){
        err.contactNumber="Contact Number Requird "
    }
    return{
        err:err,
        isValid:Object.keys(err).length===0
    }
}



const client=(info)=>{
    const err={}
    if(!info.name){
        err.name="Name Requird"
    }
    if(!info.ID){
        err.ID="ID Requird"
    }
    if(!info.email){
        err.email="Email Requird"
    } else if(!validator.default.isEmail(info.email)){
        err.email="Email Not Valid "
    }
    if(!info.leadSource){
        err.leadSource="Lead source  Requird"
    }
     if(!info.address){
        err.address="Address Requird"
    }
    if(!info.contactNumber){
        err.contactNumber="Contact Number  Requird"
    }
     if(!info.city){
        err.city="City Requird"
    }
    if(!info.nextFollowUpDate){
        err.nextFollowUpDate="Follow Up Date Requird "
    }
    if(!info.state){
        err.state="state  Requird "
    }
    if(!info.zip){
        err.zip="Zip code   Requird "
    }
    if(!info.description){
        err.description="Description   Requird "
    }
    
    if(!info.budget){
        err.budget="Budget requird"
    } 
    if(!info.serviceName){
        err.serviceName="Service name"
    }
    return{
        err:err,
        isValid:Object.keys(err).length===0
    }
}



const loginValidator =(info)=>{
    
    let err={}
    if(!info.email){
        err.email="Email Requird"
    } else if(!validator.default.isEmail(info.email)){
        err.email="Email Not Valid "
    }
    if(!info.password){
        err.password="Password Requird"
    }
    return{
        err:err,
        isValid:Object.keys(err).length===0
    }
}



module.exports ={
    login:loginValidator,
    client:client,
    register:registervalidator
}