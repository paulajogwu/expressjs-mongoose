const mongoose = require('mongoose');

const POSSchema = new mongoose.Schema({
    userName: {
        type: String
       
    },
    CardName: {
        type: String
       
    },
    CardNumber: {
        type: String,
    }, 
    amount: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('POS', POSSchema)