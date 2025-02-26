// defines schema of db:
const mongoose = require('mongoose')
const { string } = require('zod')

//connecting to mdb 
mongoose.connect('mongodb+srv://Aditya2002:kamble123@cluster0.05v86.mongodb.net/course_selling_app')
// note: /course_selling_app is an extention added which will create db of that name
//define schemas
//Schemas define the structure of your data—what fields your documents should have and their types.
// This ensures your database has a predictable structure.
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId, // Corrected "ObjectId"
        ref: 'Course' // Refers to the 'Course' model
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
})

const Admin = mongoose.model('Admin', adminSchema)
const User = mongoose.model('User', userSchema)
const Course = mongoose.model('Course', courseSchema)

module.exports = {
    Admin, User, Course
}
//mongoDB is schemaless
//Mongoose enforces the rules in your schema (e.g., required: true).
// If invalid data is provided, Mongoose will throw an error.
//Models are like JavaScript classes that represent your collections (Admin, User, Course).
// They let you interact with the database using methods like find, create, or update