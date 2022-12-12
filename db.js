require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Paulson:Paul1ajogwu@cluster0.5eidjpa.mongodb.net/TalkApp', {
    //mongodb+srv://Paulson:Paul1ajogwu@cluster0.5eidjpa.mongodb.net/TalkApp
   //mongodb://127.0.0.1:27017/TalkApp
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => { 
    if (!err) { 
        console.log('DB connection successful')
    } else {
        console.log('Error connecting to DB' + err)
    }
});






  