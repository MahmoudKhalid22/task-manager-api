const express = require('express');
require('dotenv').config();
const userRouter = require('./router/users');
const taskRouter = require('./router/tasks');
const mongoose = require('./db/mongoose');
const multer = require('multer')


const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT,() => console.log('Server is running now on port http://localhost:' + PORT + ' localhost === 192.168.1.10'));

