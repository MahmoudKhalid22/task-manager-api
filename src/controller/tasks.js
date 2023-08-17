const User = require('../model/users');
const Task = require('../model/tasks')

const createTask = async (req,res) => {
const task = await new Task({...req.body,owner:req.user._id});
try{
 await task.save();
 res.status(201).send(task)
}
catch(err){
 res.status(500).send(err);
}
}

// -----------------------------------------
const getTasks = async (req,res) => {
     const match = {}
     
     if(req.query.completed){
	match.completed = req.query.completed === 'true'
	}
try{
// const tasks = await Task.find({owner:req.user._id}); // one approach
 await req.user.populate({
	path: 'tasks',
	match
  })			// one approach
 res.send(req.user.tasks);
}

catch(err){
res.status(500).send(err);
}

}
// -----------------------------------------

const getTask = async (req,res) => {

try{
const task = await Task.findOne({_id:req.params.id,owner:req.user._id})

 res.send(task);
}

catch(err){
res.status(500).send(err);
}

}

// -----------------------------------------

const updateTask = async (req,res) => {


const allowedUpdates = ['description','completed']
const updates = Object.keys(req.body);

const isValidUpdates = updates.every(update => allowedUpdates.includes(update));
if(!isValidUpdates) return res.status(400).json({err:'no valid updates'})
try{
 const task = await Task.findOne({_id:req.params.id,owner:req.user._id})

 if(!task) return res.status(404).send('task is not found')

 updates.forEach(update => task[update] = req.body[update]) 
 await task.save()
 res.send(task);
}

catch(err){
res.status(500).send(err);
}

}


// -----------------------------------------

const deleteTask = async (req,res) => {

try{
 const task = await Task.findByIdAndDelete(req.params.id)
 if(!task) return res.status(404).send('task is not found')
 
 res.send('Your task has been deleted');
}

catch(err){
res.status(500).send(err);
}

}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask }
