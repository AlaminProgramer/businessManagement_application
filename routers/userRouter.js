const userRouter=require('express')()


const businessController=require('../controller/businessController')
const employeeController=require('../controller/employeeController')
const clientController=require('../controller/clientController')

const commonController  =require('../utility/commonController')
// common router
userRouter.post('/login', commonController.login)


// business user
userRouter.post('/businessRegister',businessController.businessRegister)
userRouter.get('/allbusinessUser', businessController.allbusinessUser)
userRouter.get('/singleBusinessUser/:id', businessController.singleBusinessUser)
userRouter.post('/updateBusinessUser/:id', businessController.updateBusinessUser)
userRouter.get('/deleteBusinessUser/:id', businessController.deleteBusinessUser)
userRouter.post('/businessLogin', businessController.login)


// employee
userRouter.post('/employeeRegister/:id', employeeController.employeeRegister)
userRouter.get('/allemployee',employeeController.allEmployee )
userRouter.get('/singleEmployee/:id', employeeController.singleEmployee)
userRouter.post('/updateEmployee/:id', employeeController.updateEmployee)
userRouter.get('/deleteEmployee/:id', employeeController.deleteEmployee)
userRouter.get('/singleBusinessEmployee/:id', employeeController.singleBusinessEmployee)
userRouter.post('/employeeLogin', employeeController.employeeLogin)
userRouter.post('/updateProfile/:id', employeeController.updateProfile)
userRouter.get ('/block/:id', employeeController.block)



// client 
userRouter.post('/createNewClient/:id',clientController.createClient)
userRouter.get('/getAllClient', clientController.getAllClient)
userRouter.get('/singleclient/:id', clientController.singleclient)
userRouter.post('/updateClient/:id', clientController.updateClient)
userRouter.get('/deleteClient/:id', clientController.deleteClient)
userRouter.get('/singleEmployeeClient/:id', clientController.singleEmployeeClient)
userRouter.get('/todayEnquiry/:id', clientController.todayEnquiry)
userRouter.get ('/completedEnquiry/:id', clientController.completedEnquiry)
userRouter.get ('/doneApi/:id', clientController.doneApi)
userRouter.get('/todayFollowUp/:id',clientController.todayFollowUp )
userRouter.get('/pandingFollowUp/:id',clientController.pandingFollowUp )
userRouter.get('/doWone/:id', clientController.doWone)
userRouter.get('/doLoss/:id', clientController.doLoss)
userRouter.get('/leadWone/:id', clientController.leadWone)
userRouter.get('/leadLoss/:id', clientController.leadLoss)
userRouter.get('/getWoneValue/:id' , clientController.getWoneValue)
userRouter.get('/getLossValue/:id' , clientController.getLossValue)
userRouter.get('/social/:id', clientController.social)
userRouter.get('/totalRevinue/:id', clientController.totalRevinue)
userRouter.post('/dateToDateRevinue/:id', clientController.dateToDateRevinue)
userRouter.get('/totalEnquiry/:id', clientController.totalEnquiry)
userRouter.post('/fromDateTodateEnquiry/:id',clientController.fromDateTodateEnquiry)
// userRouter.post('/toggle',clientController.toggle)



module.exports=userRouter

