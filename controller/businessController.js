
const bcrypt =require('bcryptjs')
const mongoose =require('mongoose')
const validator=require('../validator/validattor')

const businessModel=require('../models/businessModel')

const jwt =require ('jsonwebtoken')

// create business user 
const businessRegister=(req, res)=>{
    const {
    name,
    email,
    contactNumber,
    password,
    confirmPassword
    }=req.body
    console.log('hello')
    
    const register=validator.register({ name,email,contactNumber,password,confirmPassword })
    console.log('hello')

    if(!register.isValid){
        return res.status(400).json({err:register.err})
    }
    else{
        businessModel.findOne({email:email})
        .then(user=>{
            
            console.log(user)
            
            if(user){
                return res.status(400).json({massage:"User allready exist"})
            }
            if(!user){
                bcrypt.genSalt(10, function(err, salt) {
                    if(err){
                        return res.status(500).json({massage:"Server error occurd", err:err})
                    }
                    bcrypt.hash(password, salt, function(err, hash) {
                        
                        if(err){
                            return res.status(500).json({massage:"Server error occurd while password hashing", err:err})
                        }else{
                            const newBusiness= new businessModel({
                                name:req.body.name,
                                email:req.body.email,
                                password:hash,
                                contactNumber:req.body.contactNumber,
                                type:"Business User"
                            })
                            .save()
                            .then(data=>{
                                return res.status(200).json({massage:"Register successfull !", data})
                            })
                            .catch(err=>{
                                return res.statusi(500).json({massage:"Error occurd ", err:err})
                            })
                        }
                    });
                });
                bcrypt.hash(password, 12 , (err , hash)=>{
                })
            }
        })
        .catch(err=>{
                return res.status(400).json({massage:"Error occure", err:err})
        })
    }
}

// get all business user 
const allbusinessUser=(req, res)=>{
    businessModel.find({})
    .then(user=>{
        res.status(201).json({user:user})
    })
    .catch(err=>{
        return res.status({err:err})
    })
}
// get single business user 
const singleBusinessUser=(req, res)=>{
    const id=req.params.id
    businessModel.findById(id, (err, user)=>{
        if(err){
            res.status(500).json({massage:"Server error occurd", err:err})
        }else{
            res.status(200).json({user:user})
        }
    })
}
// update businessuser 
const updateBusinessUser=(req, res)=>{
   let updateInfo={
        name:req.body.name,
        email:req.body.email,
        contactNumber:req.body.contactNumber,
    
    }
    businessModel.findByIdAndUpdate(req.params.id, updateInfo,{new:true}, (err, updated)=>{
        if(err){
            return res.status(500).json({massage:"Error occurd", err:err})
        }
        else{
            res.status(202).json({massage:"Updated successfull !", updated:updated})
        }
    })
}
// delete business user 
const deleteBusinessUser=(req, res)=>{
    console.log("deleting")
      businessModel.findByIdAndRemove(req.params.id, (error, data)=>{
        if(error){
            console.log("error in deleting yo!");
            res.json({error:error})
        }

            console.log("data all gone and deleted yo");
            res.status(200).json({massage:"Deleted successfull !", data});


    });
}
const login=(req, res)=>{

    const  loginValidate=validator.login(req.body)
    if(!loginValidate.isValid){
        res.status(400).json(loginValidate.err)
        return
    }else{
        businessModel.findOne({email:req.body.email})
        .then(data=>{
            if(!data){
                res.status(400).json({massage:"User Not Found "})
                return
            }
            bcrypt.compare(req.body.password, data.password)
            .then(reesult=>{
                if(!reesult){
                    res.status(404).json({massage:"Wrong password"})
                }
                if(reesult){
                    const token=jwt.sign({name:data.name, email:data.email, type:data.type, _id:data._id},'secret', {expiresIn:'4h'})

                    res.status(200).json({massage:"Loin successfull", token:token})
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    }
}
module.exports={
    businessRegister:businessRegister,
    allbusinessUser:allbusinessUser,
    singleBusinessUser:singleBusinessUser,
    updateBusinessUser:updateBusinessUser,
    deleteBusinessUser:deleteBusinessUser,
    login:login
}