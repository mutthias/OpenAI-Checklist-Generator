const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => { // Get request at route /todos
  const todos = await Todo.find(); // async function,  so we need await
  res.json(todos); // jsonify our todos 
})

app.post('/todo/new', (req,res) => {
  const todo = new Todo({
    text: req.body.text 
  });
  todo.save(); // save todo to actual collection
  res.json(todo); // parse (jsonify) todo to list
});

app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    todo.complete = !todo.complete;
    todo.save();
   res.json(todo);
  }
  
})

app.listen(3001, () => console.log("Server started on port 3001!"))
