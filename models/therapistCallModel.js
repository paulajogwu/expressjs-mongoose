const mongoose = require('mongoose');

const TherapistCall = new mongoose.Schema({
    userName: {
        type: String
       
    },
    therapistId: {
        type: String
       
    },
    therapistName: {
        type: String
       
    },
    profession: {
        type: String,
    }, 
    duration: {
        type: String,
    }, 
    rating: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('TherapistCall', TherapistCall)