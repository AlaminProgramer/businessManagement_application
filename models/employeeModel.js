const mongoose =require('mongoose')

const Schema =mongoose.Schema

const employeeRegister=new Schema({
    name:{
        type:String,
        required:true
    },
    type:String,
    _id:Schema.Types.ObjectId,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    businessModel:{
        type: Schema.Types.ObjectId,
        ref: 'businessModel',
        required:true
    },
    block:false
})


const employeeModel =mongoose.model('employeeModel', employeeRegister)
module.exports =employeeModel


