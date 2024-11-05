const User = require('../models/userSchema');
const bcrypt = require('bcrypt');


const logIn = async (req,res)=>{
try{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user){
        const compPass = user.hashedPassword;
        const thisPass = await bcrypt.compare(password, compPass);
        if(thisPass){
            res.status(200).json({message:"Successful log in"});
            console.log("Successful log in");
        }
        else{
            res.status(401).json({message:'wrong credentials'});
            console.log("Wrong password");
        }
    }
    else{
        res.status(401).json({message:'No user found please sign up'});
        console.log("No user");
    }

}
catch(error){
    console.error("An error occured: " + error);
    res.status(500).json({message: 'Server side error'});
}
}

module.exports = logIn;