const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async ()=> {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URIONLINE,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDb: " + connect.connection.host);
    }
    catch(error){
        console.error("Error connecting to Mongo Db: " + error);
        process.exit(1);
        
    }
}

module.exports = connectDb;