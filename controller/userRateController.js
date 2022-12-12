const Rating = require('../models/userRateModel')


exports.createRate = async (req, res) => {
    const userName = req.body.userName;
    const comment = req.body.comment;
    const rating = req.body.rating;
  
    // Check if form data  exits
    if (
        userName == "" ||
        userName == null ||
        comment == "" ||
        comment == null ||
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
        let  data = await Rating({
            userName ,
            comment,
            rating 
        }).save({})
        return res.send({
          status: true,
          message:'Thanks For Rating Us',
          data:data
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
    console.log("good",data)
    return res.send(data);
    
  }