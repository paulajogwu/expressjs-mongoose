const account = require("../models/userModel");
const Payment = require("../models/paymentModel");

exports.getBalance = async (req, res) => {
  const _id = req.params._id;
  console.log("========", _id)
  const user = await account.findOne({ _id: _id });
  if (!user) {
    return res.status(400).send({
      message: `No User found with this userName : ${_id}`,
    });
  }

  return res.send({
    status:true,
    data:user.balance
  });
};

exports.MakaPay = async (req, res) => {
  const userName = req.body.userName;
  const therapistName = req.body.therapistName;
  const Profession = req.body.profession;
  const amount = req.body.amount;

  account.find({ userName: userName }).then((data) => {
    if (data == "") {
      res.send({
        status: false,
        message: "User Account Does Not Exist",
        data: null,
      });
    } else if (req.body.amount > data[0].balance) {
      res.send({
        status: true,
        data: null,
        message: "insufficient fund",
      });
    } else {
      var updatedBalance =
        parseFloat(data[0].balance) - parseFloat(req.body.amount);

      console.log("updatedBalance", updatedBalance);

      if (updatedBalance < 0) updatedBalance = 0.0;
      account
        .findOneAndUpdate(
          { userName: userName },
          { balance: updatedBalance },
          { new: true }
        )
        .then((data) => {
          res.send({
            status: true,
            data: data,
            message: "Payment Successful",
          });

          var PaymentInfo = new Payment({
            userName,
            therapistName,
            Profession,
            amount,
          });

          // saves to mongodb
          PaymentInfo.save(function (err, data) {
            console.log(data);
          });
        })
        .catch((err) => {
          return res.send({
            message: `Error: ${err}`,
          });
        });
    }
  });
};


exports.getTransaction = async (req, res) => {
  const _id = req.params._id;
 
  const data = await Payment.findOne({ _id: _id });
  if (!data) {
    return res.send({
      message: `No User found with this Id : ${_id}`,
    });
  }

  return res.status(200).json({
    status:true,
    data:data
  });
};
exports.findAll = async (req, res) => {
  const data = await Payment.find({})
  if (!data) {
    return res.send({
      message: `No record found `,
    })
  }
  console.log('good', data)
  return res.send({
    status:true,
    message:'Successful',
    data:data
  })
}