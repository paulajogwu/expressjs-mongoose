const mongoose = require('mongoose');

const userCallSchema = new mongoose.Schema({
    caller: {
        type: String
    },
    receiver: {
        type: String
       
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

module.exports = mongoose.model('UsersCall', userCallSchema)