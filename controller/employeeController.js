const employeeModel = require('../models/employeeModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('../validator/validattor')
const businessModel =require('../models/businessModel')




const employeeRegister = (req, res) => {
    console.log('register employee')
    const { name, email, password, confirmPassword, contactNumber } = req.body
    const validate = validator.register({ name: name, email: email, password: password, confirmPassword: confirmPassword, contactNumber: contactNumber })
    if (!validate.isValid) {
        return res.status(400).json(validate.err)
    } else {
        bcrypt.hash(password, 13, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err })
            } else {
                let employeeobj = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    contactNumber: req.body.contactNumber,
                    _id: new mongoose.Types.ObjectId(),
                    businessModel: req.params.id,
                    type: "employee",
                    block:false
                }
                let newUser = new employeeModel(employeeobj)
                    .save()
                    .then(user => {
                       return res.status(201).json({
                            message: 'User Created Successfully',
                            user
                        })
                    })
                    .catch(error => {
                       return res.status(500).json({ err: err })
                    })

            }

        })
    }
}

// get all employee
const allEmployee = (req, res) => {
    console.log('getting all client')
    employeeModel.find({}).populate('businessModel').exec((err, employees) => {
       return res.status(200).json(employees)
    })

}



// get single client
const singleEmployee = (req, res) => {
    const id = req.params.id
    employeeModel.findById(id, (err, client) => {
        if (err) {
           return res.status(500).json({ massage: "Server error occurd", err: err })
        } else {
           return res.status(200).json({ user: client })
        }
    })
}
// update client 
const updateEmployee = (req, res) => {
    let updateInfo = {
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,

    }
    employeeModel.findByIdAndUpdate(req.params.id, updateInfo, { new: true }, (err, updated) => {
        if (err) {
            return res.status(500).json({ massage: "Error occurd", err: err })
        }
        else {
           return res.status(202).json({ massage: "Updated successfull !", updated: updated })
        }
    })
}
// delete business user 
const deleteEmployee = (req, res) => {
    console.log("deleting")
    employeeModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            console.log("error in deleting yo!");
           return res.json({ error: error })
        }

        console.log("data all gone and deleted yo");
       return res.status(200).json({ massage: "Deleted successfull !", data });


    });

}
// single  business employee
const singleBusinessEmployee = (req, res) => {

    employeeModel.find({}).populate('businessModel').exec((err, employees) => {
        
        let array = employees.filter(single => {
            return single.businessModel._id == req.params.id
        })
        return res.status(200).json({employees:array})

     })
    // employeeModel.find({}).populate('register').exec((err, client) => {
    //     let array = client.filter(single => {
    //         return single.businessModel == req.params.id
    //     })
    //    return res.status(200).json({employees:array})
    // })
}




const login = (req, res) => {
    console.log('el')
    const loginValidate = validator.login(req.body)
    if (!loginValidate.isValid) {
       return res.status(400).json({err:loginValidate.err})
        
    } else {
        employeeModel.findOne({ email: req.body.email })
            .then(data => {
                if (!data) {
                   return res.status(400).json({ massage: "User Not Found " })
                    
                }
                if(data.block==true){
                    res.status(400).json({massage:'You have no  Access to login  .'})
                }
                bcrypt.compare(req.body.password, data.password)
                    .then(reesult => {
                        if (!reesult) {
                           return res.status(404).json({ massage: "Wrong password" })
                        }
                        if (reesult) {
                            const token = jwt.sign({ name: data.name, email: data.email, _id: data._id, type: data.type }, 'secret', { expiresIn: '4h' })
                           return res.status(200).json({ massage: "Loin successfull", token: token })
                        }
                    })
            })
            .catch(err => {
                console.log(err)
               return res.status(500).json(err)
            })
    }
}


// update client 
const updateProfile = (req, res) => {
    let updateInfo = {
        name: req.body.name,
        email: req.body.email,
        newPassword:req.body.password,
        prevPassword:req.body.prevPassword
    }
    console.log(updateInfo)
    if(req.body.type=="employee"){
            
        employeeModel.findById(req.params.id)
        .then(data => {
            console.log("password is :" ,data)
            bcrypt.compare(updateInfo.prevPassword, data.password)
                .then(reesult => {
                    if (!reesult) {
                    return res.status(404).json({ massage: "Wrong password" })
                    }
                    bcrypt.hash(updateInfo.newPassword, 13, (err, hash)=>{
                        if(err){
                            console.log(err)
                            return res.status(500).json({massage:" Server error orrurd ", err})
                        }
                        data.name=updateInfo.name
                        data.email=updateInfo.email
                        data.password=hash

                        data.save()
                        .then(updated=>{
                            return res.status(200).json({massage:"Updated ", updated:updated} )
                        })
                        .catch(err=>{
                            console.log(err)
                            return res.status(500).json({massage:"Server error occured "})
                        })
                    })
                    
                })
        })
        .catch(err => {
            console.log(err)
        return res.status(500).json(err)
        })
    }
    if(req.body.type=="Business User"){
            
        businessModel.findById(req.params.id)
        .then(data => {
            console.log("password is :" ,data)
            bcrypt.compare(updateInfo.prevPassword, data.password)
                .then(reesult => {
                    if (!reesult) {
                    return res.status(404).json({ massage: "Wrong password" })
                    }
                    bcrypt.hash(updateInfo.newPassword, 13, (err, hash)=>{
                        if(err){
                            console.log(err)
                            return res.status(500).json({massage:" Server error orrurd ", err})
                        }
                        data.name=updateInfo.name
                        data.email=updateInfo.email
                        data.password=hash

                        data.save()
                        .then(updated=>{
                            return res.status(200).json({massage:"Updated ", updated:updated} )
                        })
                        .catch(err=>{
                            console.log(err)
                            return res.status(500).json({massage:"Server error occured "})
                        })
                    })
                    
                })
        })
        .catch(err => {
            console.log(err)
        return res.status(500).json(err)
        })
    }
}

// update client 
const block = (req, res) => {

    employeeModel.findById(req.params.id)
    .then(data => {
        data.block=!data.block
        data.save()
        .then(data=>{
            return res.status(200).json({massage:" User Blocked ", data})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({massage:"Server error occurd !"})
     
        })
    })
    .catch(err => {
        console.log(err)
       return res.status(500).json(err)
    })
}

module.exports = {
    employeeRegister: employeeRegister,
    allEmployee: allEmployee,
    singleEmployee: singleEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    singleBusinessEmployee: singleBusinessEmployee,
    employeeLogin: login,
    updateProfile:updateProfile,
    block:block
}