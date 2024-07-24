// const dotenv = require('dotenv');
const mongoose = require('mongoose')
// dotenv.config();
// const uri = process.env.PORT
//this should be stored in a env file naturally and shouldnt be shared to the public
// console.log(uri, "hoho")
console.log(process.env.URI)
mongoose.connect(process.env.URI) 


const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todo', todoSchema)

module.exports ={
    todo
}