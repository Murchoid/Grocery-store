//this is for backend, mtu asiguze

const express = require('express');
const app = express();
const port = 5000;


const connectDb = require('./config/connectToDb');

connectDb();

app.listen(port, ()=>{
    console.log("Sever listening at port "+ port);
})