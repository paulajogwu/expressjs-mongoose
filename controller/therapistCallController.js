const Rating = require('../models/therapistCallModel')


exports.createCall = async (req, res) => {
    const userName = req.body.userName;
    const therapistId = req.body.therapistId;
    const therapistName = req.body.therapistName;
    const profession = req.body.profession;
    const duration = req.body.duration;
    const rating = req.body.rating;
    // Check if form data  exits
    if (
        userName == "" ||
        userName == null ||
        therapistId == "" ||
        therapistId == null ||
        therapistName == "" ||
        therapistName == null ||
        profession == "" ||
        profession == null ||
        duration == "" ||
        duration == null ||
        rating == "" ||
        rating == null 
    ) {
        res.status(500).json({
            status: false,
            message:
                "Fill out all required fields",
            data: null,
        });
    } else {
        try {
            let data = await Rating({
                userName,
                therapistId,
                therapistName,
                profession,
                duration,
                rating
            }).save({})
            return res.status(200).json({
                status: true,
                message: 'Thanks For Rating Us',
                data: data
            });
        } catch (err) {

            return res.status(500).send({
                message: `Error: ${err}`,
            });
        }
    }
},

    exports.findAll = async (req, res) => {
        const data = await Rating.find({});
        if (!data) {
            return res.status(400).send({
                message: `No record Found! `,
            });
        }
        console.log("good", data)
        return res.status(200).send(data);

    }


    exports.findById = async (req, res) => {
        const userName = req.params.userName;
       
        const data = await Rating.findOne({ userName: userName });
        if (!data) {
          return res.status(500).send({
            message: `No User found with this userName : ${userName}`,
          });
        }
      
        return res.status(200).json(data);
      };