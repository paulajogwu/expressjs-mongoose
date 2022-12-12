const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: String
       
    },
  
    details: {
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

module.exports = mongoose.model('Transaction', PaymentSchema)