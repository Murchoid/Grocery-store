const bcrypt = require('bcrypt');
const userSchema =require('../models/userSchema')

const registerUser = async (req,res)=>{
    const salt = 10;
    try{

        //destructuring the req.bdy 
        const {userName, email, password} = req.body;

        //self explanatory
        const hashedPassword = await bcrypt.hash(password, salt);


        //here i prepare to save the user schema
        const User = new userSchema({
            userName,
            email,
            hashedPassword,
        });

        await User.save();

        console.log('User successfully registered'); /*for debugging purposes*/
        res.status(200).json({message: 'Successfully register new user'});
    }
    catch(error){
        if(error.code==11000){ /*this code in mongodb means user with email exists*/
            console.log("User already exists");
            res.status(400).json({error:'User exists'});
        }
        else{
            console.error("An error occured: ", + error);
        }
    }
}

module.exports = registerUser;