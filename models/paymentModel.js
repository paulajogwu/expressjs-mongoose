const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userName: {
        type: String
       
    },
    therapistName: {
        type: String
       
    },
    Profession: {
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

module.exports = mongoose.model('Payment', PaymentSchema)