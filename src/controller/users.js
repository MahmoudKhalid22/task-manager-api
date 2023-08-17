const mongoose = require('mongoose');
//const multer = require('multer');
const sharp = require('sharp');
const User = require('../model/users');
const { createAccount,deleteAccount } = require('../email/account')

const createUser = async (req,res) => {
   const user = new User(req.body);
   try{

	await user.save();
	const token = await user.generateAuthToken();
	createAccount(req.body.email,req.body.name);
	res.send({user,token})
   }
   catch(err){
	res.status(500).send(err)
	}

}
// ------------------------------------------
const loginUser = async (req,res) => {
try{
const user = await User.findByCredentials(req.body.email,req.body.password);
const token = await user.generateAuthToken()

res.send({user,token})
}
catch(err){
res.status(400).json({err:"no valid data"});
}
}
// -------------------------------------------

const logoutUser = async (req,res) => {

req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
await req.user.save();
res.send('You logged out');
}


// ------------------------------------------
const logoutAll = async (req,res) => {
try{
req.user.tokens = [];
await req.user.save();
res.send('all users now logout');
}
catch(err){
	res.status(500).send('something went wrong');
}
}
// ------------------------------------------


const getUser = async (req,res) => {
try{   

res.send(req.user);
}
catch(err){
	res.status(500).send('something went wrong')
}
}
// -----------------------------------------
const getUserById = async (req,res) => {
try{

const user = await User.findById(req.params.id)
if(!user) res.status(400).json({err:'user is not found'})
res.send(user);
}catch(err){

res.status(400).send(err);
}

}

// -----------------------------------------
const updateUser = async (req,res) => {
  
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name','email','password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  console.log(isValidOperation)
  console.log(updates) 
  if(!isValidOperation) return res.status(400).json({error:'invalid updates!'});

 try{

// const user = await User.findById(req.params.id);
updates.forEach(update => req.user[update] = req.body[update])
await req.user.save();

res.send(req.user)
}
  catch(err){

	res.status(500).send(err)
	}

}
// -------------------------------------------------

const deleteUser = async (req,res) => {

try{

const user = await User.deleteOne({_id:req.user._id})
deleteAccount(req.user.email,req.user.name);
res.send(user);
}catch(err){
res.send(err)
}

}
// ------------------------------------------------


const uploadUser = async (req,res) => {
try{
   
   const buffer = await sharp(req.file.buffer).resize({width:300,height:300}).png().toBuffer()
   req.user.avatar = buffer
   await req.user.save();
   res.send()
}
catch(err){
res.status(500).send()
	}
}

// -------------------------------------------------
const getUserAvatar = async (req,res) =>{
try{
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar) throw new Error()
    res.set('Content-Type','image/png')
    res.send(user.avatar)
}

catch(err){
res.status(404).json({error:"user is not found"})
}

} 



module.exports = {createUser,loginUser,logoutUser,logoutAll,getUser,updateUser,deleteUser,uploadUser,getUserById,getUserAvatar}
