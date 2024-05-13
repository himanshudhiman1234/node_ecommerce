const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true 
    },
    country:{
        type:String,
        required:true 
    },
    role:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const User = mongoose.model('User',userSchema)

module.exports =User;