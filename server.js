const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var cors = require('cors')
const app=express();
const PORT=process.env.PORT || 5000;
const morgan =require('morgan')

const userRouter=require('./routers/userRouter')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan('dev'))


app.use('/api', userRouter)


mongoose.connect('mongodb://localhost/anotherDatabase',{useNewUrlParser:true, useFindAndModify:false, useUnifiedTopology:true})
.then(()=>{
	console.log("mongodb connected successfull ")
})
.catch(err=>{
	console.log(err)
})










app.listen(PORT , ()=>{
	console.log(`server started on port no : ${PORT}`)
})