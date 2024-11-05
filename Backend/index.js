//this is for backend, mtu asiguze

//importing the necessary packages to work with express
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


//express middleware to allow cross origin requests
app.use(cors());


//importing the file that has the function to connect to the database
const connectDb = require('./config/connectToDb');
const userRoutes = require('./routes/userRoute')
const itemRoutes = require('./routes/itemsRoute');


//suing the bodyparse so that i can used the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.options('/api', cors()); 

//making sure all routes that start with /api use the userRoutes

app.use('/api', userRoutes);
app.use('/api', itemRoutes);

connectDb();


app.listen(port, ()=>{
    console.log("Sever listening at port "+ port);
})