const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userName: {
        type: String
       
    },
    gender: {
        type: String
       
    },
   
   
    phone: {
        type: String
     
    }, 
    email: {
        type: String
       
    },

    password: {
        type: String
       
    },
    lat_long:{
        type: String
    },
    location:{
        type: String
    },
    voice:{
        type:String
    },
    balance:{
        type:String
    },
    verification:{
        type: String,
        enum : ['Pending','Approved'],
        default: 'Pending'
    },
    verifyCode:{
        type: String
    },
      
    date: {
        type: Date,
        default: Date.now
    }
   
}, {timestamps:true})

module.exports = mongoose.model('userAccount', UsersSchema)