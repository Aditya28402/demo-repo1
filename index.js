const express= require('express')
const bodyParser=require("body-parser")
const app=express()
const adminRouter= require("./routes/admin")
const userRouter= require("./routes/user")

//middleware for parsing req. bodies

app.use(bodyParser.json()) 
app.use("/admin",adminRouter) // all req to /admin go to adminRouter
app.use("/user",userRouter)

const port =2999
app.listen(port,()=>{console.log(("port is running"))
})