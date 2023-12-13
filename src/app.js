const express = require("express");
const ev = require("dotenv").config({ path: "./test.env" });
const userRouter = require("./router/users");
const taskRouter = require("./router/tasks");
const mongoose = require("./db/mongoose");
const multer = require("multer");
const { docs } = require("./utils/swagger");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
docs(app);

module.exports = app;
