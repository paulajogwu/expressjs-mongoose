const Rating = require('../models/usersCallModel')


exports.createCall = async (req, res) => {
    const caller = req.body.caller;
    const receiver = req.body.receiver;
    const duration = req.body.duration;
    const rating = req.body.rating;
    // Check if form data  exits
    if (
        caller == "" ||
        caller == null ||
        receiver == "" ||
        receiver == null ||
        duration == "" ||
        duration == null ||
        rating == "" ||
        rating == null 
    ) {
        res.send({
            status: false,
            message:
                "Fill out all required fields",
            data: null,
        });
    } else {
        try {
            let data = await Rating({
                caller,
                receiver,
                duration,
                rating
            }).save({})
            return  res.send({
                status: true,
                message: 'Thanks For Rating Us',
                data: data
            });
        } catch (err) {

            return res.send({
                message: `Error: ${err}`,
            });
        }
    }
},

    exports.findAll = async (req, res) => {
        const data = await Rating.find({});
        if (!data) {
            return res.send({
                message: `No record Found! `,
            });
        }
        console.log("good", data)
        return res.send(data);

    }