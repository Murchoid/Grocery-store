//this is for backend, mtu asiguze

const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');


const connectDb = require('./config/connectToDb');
const userRoutes = require('./routes/userRoute')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', userRoutes);

connectDb();



app.listen(port, ()=>{
    console.log("Sever listening at port "+ port);
})