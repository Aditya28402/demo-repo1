// middleware for handling auth:
//preventing unauth user access
const {Admin}=require("../assignWeek4.3/assign1/db/index") // getting admin model from db to check if user exist in db or not
function adminMiddleware(req,res,next){
    //admin auth logic
    let username=req.headers.username;//ip
    let password =req.headers.password; //ip
    Admin.findOne({ // checking in db
        username:username, password:password
    }).then(function(value){
        if(value){ //if user exist then findOne fun returns some non zero value
            next();
        }
        else{
            res.status(403).json({
                msg: "admin does not exist"
            })
        }
    })

}

// .then() method is used to handle the resolved value of a Promise.
// The Admin.findOne() method internally performs a query on the database.
// If the query is successful, the Promise is resolved with the result
// (either the found document or null if no document matches).
// The .then() method captures this resolved value and passes it
//  to the callback function (as value in your case)
// The function inside .then() gets its argument (value) from the
// Promise returned by Admin.findOne(). This is how Promises are designed to work in JavaScript.
module.exports=adminMiddleware
