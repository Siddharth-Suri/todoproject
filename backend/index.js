//write basic express boiler plate code 
// with express.json middleware
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.URI
//this should be stored in a env file naturally and shouldnt be shared to the public
const express = require('express');
const cors = require('cors')
const app = express();

const { todo } = require('./db.js')
const { createTodo } = require("./types.js")
const { updateTodo } = require("./types.js")

app.use(express.json());
app.use(cors())

app.post('/todo', async (req,res)=>
{
    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload)
    if (!parsedPayload.success){
        res.status(400).json({
            msg: "you sent the wrong inputs "
        })
        return;
    }
    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed: false

    })
    res.json({
        msg: 'todo created'
    })

})

app.get('/todos', async (req,res)=>{
    /*
    todos.find is used to get back the data present in the database 
        todo.find({}) will get back everything but we can put conditions in it like:
        todo.find({
            completed:true
        })
    
    todos.find will take a long time to be returned back thats why we need a 
    await or then syntax as find is promisified
    */
    
    const todos = await todo.find({})
    
    res.status(404).json({
        todos
    })
})

app.put('/completed', async (req,res)=>{
    const Payload = req.body 
    const ParserPayloadUpdate = updateTodo.safeParse(Payload)
    if (!ParserPayloadUpdate.success){
        res.status(404).json({
            msg:'the data you have sent is incorrect'
        })
        return;
    }

    /* 
    update syntax is first brackets contain the condition and 
    second brackets contain what needs to be updated
    */

    await todo.update({
        // _ helps with unique identified and mongo db creates this automatically for you 
        _id: req.body.id
    },{
        completed:true
    })
    res.json({
        msg: "todo is marked as completed "
    })
})

app.listen(3000)