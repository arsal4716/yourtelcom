const mongoose = require('mongoose');

const rmusers =  new mongoose.Schema({
    reId:{
        type:String,
    },
    name:{
        type: String,
    },
    dateofBirth:{
        type: String,
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
    },
    address:{
        type: String,
    },
    driverLicenseAddress:{
        type: String,
    },
    shipaddress:{
        type: String,
    },
    InternetAddress:{
        type: String,
    },
    RogerAccountNumber:{
        type: String,
    },
});

const RMusers = mongoose.model("Rogers Moblity Users", rmusers);
module.exports = RMusers;