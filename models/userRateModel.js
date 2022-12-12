const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    userName: {
        type: String
       
    },
    comment: {
        type: String
       
    },
    rating: {
        type: String,
    }, 
    date: {
        type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('Rate', RateSchema)