const validator =require('../validator/validattor')
const clientModel =require('../models/clientModel')
const bcrypt =require('bcryptjs')
const mongoose =require('mongoose')

// create client 
const createClient=(req,res)=>{
    console.log(req.body)
    let { name, ID, email, leadSource, address, contactNumber, city, state, zip,
    description,_id , nextFollowUpDate , createDate, serviceName, budget} = req.body

    let validate = validator.client({name, ID, email, leadSource, address, contactNumber, city, state, zip,
    description , nextFollowUpDate, serviceName, budget })
    
    if (!validate.isValid) {
        return res.status(400).json(validate.err)
    } 
    clientModel.findOne({email:email}, (err, client)=>{
        if(err){
            return res.state(500).json({massage:"Error occurd", err:err})
        }
        let clientObj  = { 
            type:"client",  
            name,
            ID,
            _id:new mongoose.Types.ObjectId(),
            email,
            leadSource, 
            address, 
            contactNumber, 
            city, 
            state, 
            zip,
            createDate,
            description,
            nextFollowUpDate,
            enquiry:false,
            followup:false,
            lead:null,
            budget,
            serviceName,
            employeeModel:req.params.id,

        }
        const newClient =new clientModel (clientObj)
        .save((err, clients)=>{
            if(err){
               return res.json({massage:"error ", err:err})
            }else {
                return res.status(200).json({massage:"Client created successfull", clients:clients})
            }
        })

    })
}
// get all client
const getAllClient=(req, res )=>{
    console.log('get all client')
    clientModel.find({}).populate('employeeModel').exec((err, clients)=>{
        if(err){
            return res.state(500).json({massage:"Error occurd ", err:err})
        }
        return res.status(200).json(clients)
    })
    
}


// get single client
const singleclient=(req, res)=>{
    const id=req.params.id
    clientModel.findById(id, (err, client)=>{
        if(err){
           return res.status(500).json({massage:"Server error occurd", err:err})
        }else{
           return res.status(200).json({user:client})
        }
    })
}

// update client 
const updateClient=(req, res)=>{
   let updateInfo={
        name:req.body.name,
        ID:req.body.ID,
        email:req.body.email,
        leadSource:req.body.leadSource,
        address:req.body.address,
        contactNumber:req.body.contactNumber,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        description:req.body.description
    
    }
    clientModel.findByIdAndUpdate(req.params.id, updateInfo,{new:true}, (err, updated)=>{
        if(err){
            return res.status(500).json({massage:"Error occurd", err:err})
        }
        else{
           return res.status(202).json({massage:"Updated successfull !", updated:updated})
        }
    })
}
// delete business user 
const deleteClient=(req, res)=>{
    console.log("deletidng")
    console.log(req.params.id)
      clientModel.findByIdAndRemove(req.params.id, (error, data)=>{
        if(error){
            console.log({massage:"error in deleting yo!", error:error});
           return res.json({error:error})
        }

            console.log("Deleted success");
            return res.status(200).json({massage:"Deleted successfull !", data});


    });
}
// single  business employee
const singleEmployeeClient =(req, res )=>{
    console.log('getting all single client ')
    clientModel.find({}).populate('register').exec((err, client)=>{
        // console.log(client)
        if(err){
            console.log("error in deleting yo!");
           return res.json({error:err})
        }
        let array=client.filter(single=>{
            return single.employeeModel._id== req.params.id
        })
        // console.log(array)
       return res.status(200).json({massage:"All Client ", client:array})
    })
}


        
const todayEnquiry =(req, res, next)=>{
    clientModel.find({}).populate('register').exec((err, clients)=>{
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
     
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
        let todayEnquiry=singleclient.filter(single=>{
            return createdDate===single.createDate && single.enquiry===false
        })
        return res.status(201).json({massage:"Today's enquiry founded !", todayEnquiry:todayEnquiry})

    })
}


        
const completedEnquiry =(req, res, next)=>{
    clientModel.find({}).populate('register').exec((err, clients)=>{
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
     
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
        let todayEnquiry=singleclient.filter(single=>{
            return createdDate===single.createDate && single.enquiry===true
        })
        return res.status(201).json({massage:"Today's enquiry founded !", todayEnquiry:todayEnquiry})

    })
}
// done api
const doneApi=(req, res)=>{
    let obj={
        enquiry:true
    }
    clientModel.findByIdAndUpdate(req.params.id, obj , {new:true})
    .then(updated=>{
        console.log('Updated success')
        console.log(updated)
        return res.status(201).json({massage:"Enquiry done !" , updated})
    })
    .catch(err=>{
        return res.status(500).json({massage:"Error occurd  done time", err:err})
    })
   
}
// today follow up

        
const todayFollowUp =(req, res, next)=>{
    console.log('getting today follow up ')
    clientModel.find({}).populate('register').exec((err, clients)=>{
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id && client.lead==null
        })
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
        let todayFollowUp=singleclient.filter(single=>{
            return createdDate===single.nextFollowUpDate && single.followup===false &&single.enquiry==true
        })
        return res.status(201).json({massage:"Today's enquiry founded !", todayFollowUp:todayFollowUp})
    })
}

const pandingFollowUp =(req, res )=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
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
        let thisDate=yy+'-'+mm+'-'+dd
        let pandingFollowUp=singleclient.filter(single=>{
            return thisDate  > single.nextFollowUpDate && single.followup===false && single.lead==null 
        })
        return res.status(201).json({massage:"Today's enquiry founded !", pandingFollowUp:pandingFollowUp})
    })
    
}




// do wone  api
const doLoss=(req, res)=>{
    let obj={
        lead:false,
        followup:true
    }
    clientModel.findByIdAndUpdate(req.params.id, obj , {new:true})
    .then(updated=>{
        console.log('Updated success')
        console.log(updated)
        return res.status(201).json({massage:"lead Loss  !" , updated})
    })
    .catch(err=>{
        return res.status(500).json({massage:"Error occurd  done time", err:err})
    })
   
}
// do loss  api
const doWone=(req, res)=>{
    let obj={
        lead:true,
        followup:true

    }
    clientModel.findByIdAndUpdate(req.params.id, obj , {new:true})
    .then(updated=>{
        console.log('Updated success')
        console.log(updated)
        return res.status(201).json({massage:"lead wone !" , updated})
    })
    .catch(err=>{
        return res.status(500).json({massage:"Error occurd  done time", err:err})
    })
   
}
const leadWone =(req, res )=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
        let leadWone=singleclient.filter(single=>{
            return single.lead ===true &&single.followup==true
        })
        return res.status(201).json({massage:"Today's wone lead founded  !", leadWone:leadWone})
    })
    
}

const leadLoss =(req, res )=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
        let leadLoss=singleclient.filter(single=>{
            return single.lead ===false &&single.followup==true
        })
        return res.status(201).json({massage:"Today's wone lead founded  !", leadLoss:leadLoss})
    })
    
}

const getWoneValue=(req, res)=>{
       
    clientModel.find({}).populate('register').exec((err, clients)=>{
        let c1=0
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
      let  woneCount=singleclient.filter(single=>{
            return single.lead ===true &&single.followup==true
        })
        woneCount.forEach(single=>{
            c1=c1+1
        })
        return res.status(201).json({woneValue:c1})
        
    })
}

const getLossValue=(req, res)=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{
        let c1=0
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
        let leadLoss=singleclient.filter(single=>{
            return single.lead ===false &&single.followup==true
        })
        
        leadLoss.forEach(single=>{
            c1=c1+1
        })
        res.status(201).json({lossValue:c1})
    })
        
}


const social =( req, res )=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{
        let i =0
        let facebookValue=0, googleValue=0,linkdinValue=0, instagramValue=0,twitterValue=0, localValue=0,youTubeValue=0, otherValue=0
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleEmployeeClient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
        // all social  count part
        let facebook=  singleEmployeeClient.filter(single=>{
            return single.leadSource ==="facebook" && single.followup==true && single.enquiry==true
        })
         facebook.forEach(single=>{
            facebookValue=facebookValue+1
        })

        let google=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="google" && single.followup==true && single.enquiry==true
        })
        google.forEach(single=>{
           googleValue=googleValue+1
       })

        let linkdin=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="linkdin" && single.followup==true && single.enquiry==true
        })
        linkdin.forEach(single=>{
           linkdinValue=linkdinValue+1
       })

        let twitter=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="twitter" && single.followup==true && single.enquiry==true
        })
        
        twitter.forEach(single=>{
            twitterValue=twitterValue+1
        })

        let instagram=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="instagram" && single.followup==true && single.enquiry==true
        })
        instagram.forEach(single=>{
           instagramValue=instagramValue+1
       })

        let local=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="local" && single.followup==true && single.enquiry==true
        })
        
        local.forEach(single=>{
            localValue=localValue+1
        })

        
        let youTube=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="youTube" && single.followup==true && single.enquiry==true
        })  

        youTube.forEach(single=>{
           youTubeValue=youTubeValue+1
       })
     
        let other=singleEmployeeClient.filter(single=>{
            return single.leadSource ==="other" && single.followup==true && single.enquiry==true
        })
         other.forEach(single=>{
            otherValue=otherValue+1
        })


        console.log(facebookValue,googleValue,linkdinValue,otherValue, youTubeValue, localValue,instagramValue,twitterValue )
        let  average = facebookValue+googleValue+linkdinValue+otherValue+ youTubeValue+ localValue+instagramValue+twitterValue
        
        let facebookP=Math.trunc((facebookValue/average)*100)
        let googleP=Math.trunc((googleValue/average)*100)
        let youTubeP=Math.trunc((linkdinValue/average)*100)
        let linkdinP=Math.trunc((linkdinValue/average)*100)
        let twitterP=Math.trunc((twitterValue/average)*100)
        let instagramP=Math.trunc((instagramValue/average)*100)
        let localP=Math.trunc((localValue/average)*100)
        let otherP=Math.trunc((otherValue/average)*100)
        
        return res.status(201).json({ facebook:facebookP,google:googleP,
        youTube:youTubeP,linkdin:linkdinP,twitter:twitterP,instagram:instagramP,local:localP,
    other:otherP })
        // google:google, linkdin:linkdin, twitter:twitter, instagram:instagram,local:local, other:other, youTube:youTube
    })
}


const totalRevinue=(req, res)=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{

        let revinue=0

        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
        let leadWone=singleclient.filter(single=>{
            return single.lead ===true &&single.followup==true
        })
        console.log("revinue:",revinue)
        leadWone.forEach(lead=>{
            console.log("adding:",lead.budget)
            let x=parseInt(lead.budget)
            let y = parseInt(revinue)
            let z =x+y
            revinue=z
        })
        console.log('total:', revinue)

        return res.status(201).json({massage:"Revinue founded  !", totalRevinue:revinue})
    })

}

const dateToDateRevinue=(req, res)=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{

    let fromDate= req.body.fromDate
    let toDate= req.body.toDate
    console.log('fd', fromDate)
    console.log('td', toDate)

    let revinue=0

    if(err){
        return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
    }
    let singleclient=clients.filter(client=>{
        return client.employeeModel._id ==req.params.id
    })
    let leadWone=singleclient.filter(single=>{
        return single.createDate<=fromDate && single.createDate>=toDate &&single.lead ===true &&single.followup==true
    })
    console.log("revinue:",revinue)
    leadWone.forEach(lead=>{
        console.log("adding:",lead.budget)
        let x=parseInt(lead.budget)
        let y = parseInt(revinue)
        let z =x+y
        revinue=z
    })
    console.log('total:', revinue)
    if(revinue<=0){
        revinue="No Transection founded between dayes"
    }

    return res.status(201).json({massage:"Date To Date Revinue founded  !", dateToDateRevinue:revinue})
    })

}

const totalEnquiry =(req, res, )=>{
    clientModel.find({}).populate('register').exec((err, clients)=>{
        let n=0
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
     
        
    singleclient.forEach(lead=>{
        console.log("adding:")
        let x = parseInt(n)
        x =x+1
        n=x
    })
        return res.status(201).json({massage:"Total enquiry founded !", totalEnquiry:n})

    })
}
fromDateTodateEnquiry=(req, res)=>{
    
    clientModel.find({}).populate('register').exec((err, clients)=>{

        let fromDate= req.body.fromDate
        let toDate= req.body.toDate
        console.log('fd', fromDate)
        console.log('td', toDate)
    
        let c=0
    
        if(err){
            return res.status(500).json({err:"Server erro while finding today enquiry", err:err})
        }
        let singleclient=clients.filter(client=>{
            return client.employeeModel._id ==req.params.id
        })
        let betweenEnquiry=singleclient.filter(single=>{
            return single.createDate<=fromDate && single.createDate>=toDate
        })
        console.log("revinue:",c)
        betweenEnquiry.forEach(lead=>{
            console.log("adding:",lead.budget)
            let x=parseInt(c)
            x =x+1
            c=x
        })
        console.log('total:', c)
        if(c<=0){
            c="No Transection founded between dayes"
        }
    
        return res.status(201).json({massage:"Date To Date Enquiry founded  !", dateToDateEnquiry:c, enquiry:betweenEnquiry})
        })
}

const toggle=(req, res)=>{
    let click=false
    let todaydate = new date()
    console.log(date)
    console.log(req.body.data)
    if(req.body.date==todaydate){
        console.log("working")
    }
    return
}

module.exports={
    createClient:createClient,
    getAllClient:getAllClient,
    singleclient:singleclient,
    updateClient:updateClient,
    deleteClient:deleteClient,
    singleEmployeeClient:singleEmployeeClient,
    todayEnquiry:todayEnquiry,
    completedEnquiry:completedEnquiry,
    doneApi:doneApi,
    todayFollowUp:todayFollowUp,
    pandingFollowUp:pandingFollowUp,
    doWone:doWone,
    doLoss:doLoss,
    leadWone:leadWone,
    leadLoss:leadLoss,
    getWoneValue:getWoneValue,
    getLossValue:getLossValue,
    social:social,
    totalRevinue:totalRevinue,
    dateToDateRevinue:dateToDateRevinue,
    totalEnquiry:totalEnquiry,
    fromDateTodateEnquiry:fromDateTodateEnquiry,
    toggle:toggle
}



// 0198942481