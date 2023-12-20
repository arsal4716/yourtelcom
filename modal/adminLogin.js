const mongoose = require('mongoose');

const adminLogin = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type: String
    },
});

const Admin = mongoose.model("admin", adminLogin);
module.exports = Admin;