const express = require('express');
const logger = require('morgan');
//const _ = require('underscore');
const bodyParser  = require('body-parser');
const cors = require('cors');
//var mongoose = require("mongoose");
const app = express();
const { Client } = require('pg');


const client = new Client({
    host:'pgdb.accsoftwarebootcamp.com',
    database: 'accsoftwarebootcamp',
    user: 'acc',
    password: 'accrocks'

});

client.connect((err) => {
    if(err){
        console.error('connection error', err.stack)
    }else{
        console.log('connected')
    }
});

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.static('public'));

//mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");
//var ObjectID = require('mongodb').ObjectID;
/*var todoSchema = new mongoose.Schema({
    _id: String,
    description: String,
    isComplete: Boolean
   });*/
//var todoModel = mongoose.model("todoModel", todoSchema);
//let todoArray = new Array()
   
//exports.todoArray = todoArra
//get rout


app.get('/todos/username/:name', (req,res)=>{
    let query = `SELECT t.id, description, iscomplete, username FROM
                    todos.todos t JOIN todos.users u ON (u.id = t.user_id)
                    WHERE username = '${req.params.name}';`;
    client.query(query ,(err,result)=>{
<<<<<<< HEAD
        if(err){
            console.log(err.stack);
        }else{
            console.log(result.rows);
            res.send(result.rows)
        }
    })
});

  /* todoModel.find({}, (err,docs)=>{
        if(err){
=======
        if(err){
            console.log(err.stack);
        }else{
            console.log(result.rows);
            res.send(result.rows)
        }
    })
});

  /* todoModel.find({}, (err,docs)=>{
        if(err){
>>>>>>> fc4fe4ef4fdd85d45c9ceb439c61a6df8f26428e
            res.status(500).send() 
        }
        docs.forEach(function(todo){
            var todoObj = {_id: todo.id, description: todo.description, isComplete: todo.isComplete}
            todoArray.push(todoObj)
        })
        exports.todoArray = todoArray
        res.status(200).json({todoArray: exports.todoArray})
    })*/
    //save values
<<<<<<< HEAD
    app.delete('/todos/username/:name/todo/:id',(req, res)=>{
        let query = `DELETE FROM todos.todos 
                    WHERE todos.id = ${req.params.id};`
        client.query(query ,(err,result)=>{
            if(err){
                res.status(400).send()
            }else{
                res.status(200).send()
            }
        })
    });
=======
>>>>>>> fc4fe4ef4fdd85d45c9ceb439c61a6df8f26428e
//app.delete('/todos/:id', (req,res)=> {
    //todoArray = []
   /* todoModel.deleteOne({ _id: req.params.id }, function (err) {
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
      });*/
//});
//post
app.post('/todos/username/:name', (req,res) => {
    let newDescription = req.body.description
    if(newDescription){
        let query = `WITH thisuser as (SELECT id FROM todos.users WHERE username='${req.params.name}')
             INSERT INTO todos.todos (description, isComplete, user_id) 
                  VALUES ('${newDescription}', false, (SELECT id FROM thisuser)) 
              RETURNING *;` 
              client.query(query ,(err,result)=>{
                if(err){
                    console.log(err.stack);
                }else{
                    console.log(result.rows);
                    res.send(result.rows)
                }
            })
        //let todo = new todoModel({_id: new ObjectID(), description: exports.newDescription, isComplete: false})
        /*todo.save(function (err, todo) {
            if (err) return console.error(err);
           
            console.log(" saved to todo collection.");
            res.status(200).send()
          });*/
    }
})
<<<<<<< HEAD
app.put('/todos/username/:name/:id', (req,res)=>{
    let query = `UPDATE todos.todos SET iscomplete = NOT iscomplete WHERE todos.id = ${req.params.id}`
    client.query(query ,(err)=>{
        if(err){
            console.log(err.stack);
        }else{
            res.status(200).send();
        }
    })
});
=======
//app.put('/todos/:id', (req,res)=>{
>>>>>>> fc4fe4ef4fdd85d45c9ceb439c61a6df8f26428e
  /*  var query = { _id: req.params.id };
    todoModel.findOneAndUpdate(query, { isComplete: true }, (err, docs)=>{
        if (err) return console.error(err);
        console.log(" updated to todo collection.");
        res.status(200).send();
        
    })
    //res.send(todoArray)
    //exports.todoArray = todoArray
    //res.status(200).json({todoArray: exports.todoArray}) */

//})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});