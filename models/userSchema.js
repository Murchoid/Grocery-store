const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userName:{
        type: String,
        require:true,
        validate:{
            validator: function (value){
                const regex= /^[a-zA-Z ]+$/;
                return regex.test(value);
            },
            message: 'Only alphabetic letters'
        }
    },
    email:{
        type: String,
        require: true,
        unique:[true, 'User exists sign in'],
        validate:{
            validator: function(value){
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email'
        }
    },
    hashedPassword:{
        type: String,
        require:true
    }
});

module.exports = mongoose.model('Users', userSchema);