const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
});
const userSchema =  new mongoose.Schema({
    companyName:{
        type:String,
    },
    choseOrder:{
        type:String
    },    
    orderTypeSelect:{
        type:String
    },
    customerTypeSelect:{
        type: String,
    },
    comission:{
        type:String,
    },
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    birthDate:{
        type: String,
    },
    choseId:{
        type: String,
    },
    passportNumber: {
        type: String,
    },
    drivingLicenseNumber:{
        type: String,
    },
    expiryDate:{
        type: String,
    },
    portingNumber:{
        type: String,
    },
    ProviderName:{
        type: String,
    },
    AccountNumber:{
        type: String,
    },
    portPhoneNumber:{
        type:String,
    },
    mainNumber:{
        type: String
    },
    mainCell: {
        type: String
    },
    // package information
    selectedPackage:{
        type: String,
    },
    line: {
        type: String,
    },
    speed: {
        type: String,
    },
    TvPackageinfo: {
        type: String,
    },
    boxesQuality:{
        type: String,
    },
    creditOfferInfo:{
        type: String,
    },
    chenalsDetails: {
        type: String,
    },
    fullPrice:{
        type: String,
    },
    preferedinstallationdate:{
       type: String   
    },
    cancelReason:{
        type: String,
    },
    noteOrder:{
        type: String,
    },
    status:{
        type:String,
    },
    orderNo:{
        type:String
    },
    installationDateTime:{
        type: String,
    },
    submissionDate: {
         type: Date, 
         default: Date.now 
        },
        
    sheetRow:{
        type: Number,
    }
});
userSchema.methods.someLogicToCalculateRow = function () {
    return this.name.length + this.email.length;
    // This is just a placeholder; you should replace it with your actual implementation
  };
const User = mongoose.model("User", userSchema);
module.exports = User;

