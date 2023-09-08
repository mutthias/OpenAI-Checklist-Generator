const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const Todo = require('../models/Todo'); 

// Get all Tasks
const GetTasks = async (req, res) => {
  const todos = await Todo.find({}).sort({createdAt: 1}); // async function,  so we need await
  res.status(200).json(todos); // jsonify our todos 
}

// Get 1 task
const GetOneTask = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { // id doesn't exist
    return res.status(404).json({error: "Task doesn't exist!"});
  } 
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({error: "Task doesn't exist!"});
  }
  
  res.status(200).json(todo);
}


// Create new task
const CreateTask = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text 
    });
    todo.save();
    res.status(200).json(todo);
  } catch (err) {
      res.status(400).json({ err: err.message });
  }
}

// Delete task
const DeleteTask = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) { // id doesn't exist
    return res.status(404).json({error: "Task doesn't exist!"});
  } 

  const deletetask = await Todo.findByIdAndDelete(req.params.id);

  if (!deletetask) {
    return res.status(404).json({error: "Task doesn't exist!"});
  }

  res.status(200).json(deletetask);
}

// Update Task
const UpdateTask = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) { // id doesn't exist
    return res.status(404).json({error: "Task doesn't exist!"});
  } 

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({error: "Task doesn't exist!"});
  }

  todo.complete = !todo.complete;
  todo.save();
  res.status(200).json(todo);
}

module.exports = { GetTasks, GetOneTask, CreateTask, DeleteTask, UpdateTask };

