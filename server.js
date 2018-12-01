const express = require('express');
const logger = require('morgan');
const _ = require('underscore');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();


const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(logger('dev'));
app.use(cors());



let todoArray = [
     {id: 1, description: "Call Mom", isComplete: false},
     {id:2 , description: "buy groceries", isComplete: false},
     {id:3 , description: "go to movies", isComplete: false}
]
exports.todoArray = todoArray
//get routes
app.get('/todos', (req,res)=>{
    res.status(200).json({todoArray: exports.todoArray})
});
app.delete('/todos/:id', (req,res)=> {
    var newTodos = _.filter(todoArray, (todo)=>{ return todo.id != req.params.id; });
    if(newTodos.length != todoArray.length){
        todoArray = newTodos
        exports.todoArray = newTodos

        res.status(200).json({todoArray: exports.todoArray})
    }
    else(
        res.status(418).send() 
    )

});
//post
var counter = 4;
app.post('/todos', (req,res) => {
    counter++;
    let newDescription = req.body
    if(newDescription){
        const key = Object.keys(newDescription)
        exports.newDescription = key
        let todo = {id: counter, description: exports.newDescription, isComplete: false}
        todoArray.push(todo)
        exports.todoArray = todoArray
        res.status(200).json({todoArray: exports.todoArray})
    }

    res.status(418).send()

})
app.put('/todos/:id', (req,res)=>{
    let thisTodo = _.findWhere(todoArray,{id: parseInt(req.params.id)})
    thisTodo.isComplete = !thisTodo.isComplete 
    //res.send(todoArray)
    exports.todoArray = todoArray
    res.status(200).json({todoArray: exports.todoArray})
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});