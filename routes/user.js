const { Router } = require("express"); //The Router function from express is used to define routes for the application.
const userMiddleware = require("../middlewares/user");
const router = Router(); // This instance will hold all the routes related to the /user endpoint.
const { User } = require("../index")
const { Course } = require("../index")
// /user route
router.post('/signup', async (req, res) => {
    // user signup logic
    let username = req.body.username;
    let password = req.body.password;
    await User.create({
        username: username,
        password: password
    })
    res.json({
        message: "user created "
    })
});

router.get('/courses', async (req, res) => {
    // listing all courses logic
    //no middleware needed as courses are aval for everyone
    const response = await Course.find({})
    res.json({
        courses: response
    })

});

router.get('/courses/:courseId', userMiddleware, async (req, res) => {
    // course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne(
        { username: username },//user with first username in db:
        {
            "$push": {
                purchasedCourses: courseId
            }
        })
    res.json({ message: "Purchase complete" });

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // fetching purchased course logic

    const user= await User.findOne({
        username:req.headers.username
    });
    console.log(user.purchasedCourses)
 
    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    });
    res.json({
       courses:courses
    });
});

module.exports = router;//Exports the router so it can be used in other parts of the application,
//  typically to handle /user-related routes.
