const mongoose=require('mongoose')
const Schema=mongoose.Schema

const clientSchema= new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    _id:Schema.Types.ObjectId,
    ID:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    leadSource:{
        type:String,
        required:true
    },
    type:String,
    address:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    }
    ,
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    nextFollowUpDate:{
        type:String,
        required:true
    },
    createDate:{
        type:String,
    },
    enquiry:Boolean,
    followup:Boolean,
    lead:Boolean,
    budget:{
        type:String,
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    employeeModel: {
        type: Schema.Types.ObjectId,
        ref: 'employeeModel',
        required:true
    }

})



const clientModel= mongoose.model('clientModel', clientSchema)
module.exports =clientModel