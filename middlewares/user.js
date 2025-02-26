// middleware for handling auth:
let {User}=require('../assignWeek4.3/assign1/db')
function userMiddleware(req,res,next){
    //user auth logic
    let username=req.headers.username;//ip
    let password =req.headers.password; //ip
    User.findOne({ // checking in db
        username:username,
         password:password
    }).then(function(value){
        if(value){
            next();
        }
        else{
            res.status(403).json({
                msg: "user does not exist"
            })
        }
    })

}
module.exports=userMiddleware