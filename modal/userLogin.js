const mongoose = require('mongoose');

const userLogin = new mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type:String
    },
});

const Userlogin = mongoose.model('UserLogin', userLogin);
module.exports = Userlogin;