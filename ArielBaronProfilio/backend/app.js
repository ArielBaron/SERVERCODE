const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('');
});
const { initDB } = require('./api/model/db');
initDB().then(() =>{
  console.log("connected to DataBase(sql)");
}).catch(err =>{
    console.error('Falied to connect DataBase' , err);
});


const testRouter = require('./api/route/test');
app.use("/test",testRouter);

const userRouter = require("./api/route/usersRouter");
app.use("/users", userRouter);

const projectRouter = require("./api/route/projectsRouter");
app.use("/projects",projectRouter);


module.exports = app; 
