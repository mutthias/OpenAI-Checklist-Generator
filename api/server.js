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
const Login = require('./models/Login');

app.get('/todos/:user', async (req, res) => {
  const user = req.params.user;
  console.log(user)
  const todos = await Todo.find({ user: user }); // Filter tasks by user's _id
  res.json(todos);
}); 

app.post('/todo/new', (req,res) => {
  const todo = new Todo({
    text: req.body.text,
    user: req.body.user
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

app.post('/signup', async (req, res) => {
  const { username, password, _id } = req.body;
  const account = new Login ({
    username: username,
    password: password,
  });

  console.log(username)
  console.log(password)
  
  try {
    const check = await Login.findOne({ username: username });

    if (check) {
      res.json("exist");

    } else {
      await Login.insertMany([account]);
      res.json("notexist");
    }
  } catch (e) {
    res.status(500).json('Failed!');
  }
  
});

app.listen(3001, () => console.log("Server started on port 3001!"))  
