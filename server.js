const express = require('express');
const logger = require('morgan');
const _ = require('underscore');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();
var mongoose = require("mongoose");

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(logger('dev'));
app.use(cors());
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");
var ObjectID = require('mongodb').ObjectID;
var todoSchema = new mongoose.Schema({
    _id: String,
    description: String,
    isComplete: Boolean
   });
var todoModel = mongoose.model("todoModel", todoSchema);
let todoArray = new Array()
   
//exports.todoArray = todoArra
//get routes
app.get('/todos', (req,res)=>{
    todoArray = []
   todoModel.find({}, (err,docs)=>{
        if(err){
            res.status(418).send() 
        }
        docs.forEach(function(todo){
            var todoObj = {_id: todo.id, description: todo.description, isComplete: todo.isComplete}
            todoArray.push(todoObj)
        })
        exports.todoArray = todoArray
        res.status(200).json({todoArray: exports.todoArray})
    })
    //save values
});
app.delete('/todos/:id', (req,res)=> {
    todoArray = []
    todoModel.deleteOne({ _id: req.params.id }, function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
        todoModel.find({},(err,docs)=>{
            if (err) return handleError(err);
            docs.forEach(function(todo){
                var todoObj = {_id: todo.id, description: todo.description, isComplete: todo.isComplete}
                todoArray.push(todoObj)
            })
            res.status(200).json({todoArray: exports.todoArray})
        })
      });
});
//post
var counter = 4;
app.post('/todos', (req,res) => {
    counter++;
    let newDescription = req.body
    if(newDescription){
        const key = Object.keys(newDescription)
        exports.newDescription = key
        let todo = new todoModel({_id: new ObjectID(), description: exports.newDescription, isComplete: false})
        exports.todo = todo
        todo.save(function (err, book) {
            if (err) return console.error(err);
            console.log(" saved to todo collection.");
          });
        res.status(200).send()
    }

    res.status(418).send()

})
app.put('/todos/:id', (req,res)=>{
    var query = { _id: req.params.id };
    todoModel.findOneAndUpdate(query, { isComplete: true }, (err, docs)=>{
        if (err) return console.error(err);
        console.log(" updated to todo collection.");
        res.status(200).send();
        
    })
    //res.send(todoArray)
    //exports.todoArray = todoArray
    //res.status(200).json({todoArray: exports.todoArray})

})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});