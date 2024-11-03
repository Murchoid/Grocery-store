const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema =require('../models/userSchema')

const registerUser = async (req,res)=>{
    const salt = 10;
    try{
        const {userName, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        
        const User = new userSchema({
            userName,
            email,
            hashedPassword,
        });

        await User.save();

        console.log('User successfully registered');
        res.status(200).json({message: 'Successfully register new user'});
    }
    catch(error){
        if(error.code==11000){
            console.log("User already exists");
            res.status(400).json({error:'User exists'});
        }
        else{
            console.error("An error occured: ", + error);
        }
    }
}

module.exports = registerUser;