const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const session = require('express-session')

var cors = require('cors')
const path = require('path');
//const ngrok = require('ngrok');
// import config
const db = require('./db');
//const video = require('./index');
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(__dirname + '/public'));

const userRoute = require('./routes/userRouter');
const transactRoute = require('./routes/transactionRouter');
const userCallRoute = require('./routes/userCallRouter');
const userRateRoute = require('./routes/userRateRouter');
const therapistCallRoute = require('./routes/therapistCallRouter');


app.use('/api/v1/talkapp', userRoute);

app.use('/api/v1/talkapp', transactRoute);
app.use('/api/v1/talkapp', userCallRoute);
app.use('/api/v1/talkapp', userRateRoute);
app.use('/api/v1/talkapp', therapistCallRoute);



app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page 
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(PORT)

// var server = app.listen(8080, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("App listening at  http://localhost:" + port);

// });

// ngrok.connect({
//     proto : 'http',
//     addr : process.env.PORT,
//     auth : `${user}:${password}`
// }, (err, url) => {
//     if (err) {
//         console.error('Error while connecting Ngrok',err);
//         return new Error('Ngrok Failed');
//     } else {
//         console.log('Tunnel Created -> ', url);
//         console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
//     }
// });