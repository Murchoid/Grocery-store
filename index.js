//this is for backend, mtu asiguze

//importing the necessary packages to work with express
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

//importing the file that has the function to connect to the database
const connectDb = require('./config/connectToDb');
//the user routes 
const userRoutes = require('./routes/userRoute')


//suing the bodyparse so that i can used the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//making sure all routes that start with /api use the userRoutes
app.use('/api', userRoutes);

connectDb();



app.listen(port, ()=>{
    console.log("Sever listening at port "+ port);
})