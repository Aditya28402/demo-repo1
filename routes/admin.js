const { Router } = require("express")
const adminMiddleware = require("../middlewares/admin")
const router = Router();
const { Admin } = require("../assignWeek4.3/db/index")
const { Course } = require("../assignWeek4.3/db/index")
//  /admin route
// /signup means /admin/signup endpoint
router.post('/signup', async (req, res) => {
    //admin signup logic
    // if admin acc does nt exist here:
    let username = req.body.username;
    let password = req.body.password;
    await Admin.create({ // because db call is async
        username: username,
        password: password
    })
    res.json({ "msg": "Admin created successfully" })
});

// you don't need to use the save() method in this code because you are using the create() method provided by Mongoose.
router.post('/courses', adminMiddleware, async (req, res) => {
    //course creation logic

    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let imageLink = req.body.imageLink;
    //zod canbe applied here
    //mongodb returns you automatically generated id 
    // so using ._id you can access the course id
    await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })
    res.json({
        message: "course created successfully", courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    //fetching all courses logic
    const response = await Course.find({})
    res.json({
        courses: response
    })
});


module.exports = router;