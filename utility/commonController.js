// const adminModel=require('../models/employeeModel')
const businesseModel=require('../models/employeeModel')
const employeeModel=require('../models/employeeModel')

const loginValidator=require('../validator/validattor')
module.exports={
    login(req, res){
        const {email , password}=req.body
        let validate = loginValidator .login({email, password})
        if(!validate.isValid){

            return res.status(400).json(validate.err)
        }
        
        businesseModel.findOne({email:req.body.email})
        .then(data=>{
            if(data){
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
            }
            
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
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    }
}