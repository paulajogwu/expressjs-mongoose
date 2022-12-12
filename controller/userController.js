const account = require('../models/userModel')
const bcrypt = require('bcrypt')
const path = require('path')
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport')
const handlebars = require('handlebars')

const { json } = require('body-parser');
const { Console } = require('console');
require('dotenv').config();
const multer = require('multer')
var formidable = require("formidable");
var fs = require("fs");

exports.createUser = async (req, res, next) => {
  console.log('good', req.body)
  const userName = req.body.username
  const gender = req.body.gender
  const email = req.body.email
  const phone = req.body.phone
  //const lat_long = req.body.lat_long 206293
  const passwordd = req.body.password

  const verifyCodee = JSON.stringify(Math.floor(100000 + Math.random() * 900000))//100000 + Math.random() * 900000)
  const balance = '0'
  console.log("iiiiiiii", verifyCodee)
  // Check if user  exits
  if (
    userName == '' ||
    userName == null ||
    gender == '' ||
    gender == null ||
    //lat_long == '' ||
    //lat_long == null ||
    email == '' ||
    email == null ||
    phone == '' ||
    phone == null ||
    passwordd == '' ||
    passwordd == null
  ) {
    res.send({
      status: false,
      message: 'Fill out all required fields',
      data: null,
    })
  } else {
    // get the total users object of available users
    var all_users = await account
      .find({})
      .then((users) => users)
      .catch(() => null)

    // check userName
    var check_username = await account
      .findOne({ userName: userName })
      .then((user) => user)
      .catch(() => null)

    // check user email
    var check_email = await account
      .findOne({ email: email })
      .then((user) => user)
      .catch(() => null)

    // check user mobile
    var check_mobile = await account
      .findOne({ phone: phone })
      .then((user) => user)
      .catch(() => null)

    // if email exist
    if (check_email) {
      // If user exists with same email
      res.send({
        status: false,
        message: 'A user exist with same email',
        user: null,
      })
    }

    // If mobile number exists.
    else if (check_mobile) {
      res.send({
        status: false,
        message: 'A user exists with same number',
        user: null,
      })
    }
    // If mobile number exists.
    else if (check_username) {
      res.send({
        status: false,
        message: 'A user exists with same username',
        user: null,
      })
    } else {
      try {
        var save = await account({
          userName,
          //lat_long,540618
          gender,
          phone,
          email,
          balance,
          verifyCode: bcrypt.hashSync(verifyCodee, 10),
          password: bcrypt.hashSync(passwordd, 10),
        }).save({})


        // var transporter = nodemailer.createTransport({
        //   host: "send.smtp.mailtrap.io",
        //   port: 2525,
        //   auth: {
        //     user: "api",
        //     pass: "f87548c3076592ca90835beffa2f7d68"
        //   }
        // });

        let transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        })

        let mailOptions = {
          from :'mazinna1998@outlook.com',
          //from: 'mailtrap@talkapp.eu-4.evennode.com',
          to: `${email}`,
          subject: 'Verify Your Email Address',
          html: `

          
               
          <!doctype html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>TalkApp Mail</title>
              <style>
                /* -------------------------------------
                    GLOBAL RESETS
                ------------------------------------- */
                
                /*All the styling goes here*/
                
                img {
                  border: none;
                  -ms-interpolation-mode: bicubic;
                  max-width: 100%; 
                }
          
                body {
                  background-color: #f6f6f6;
                  font-family: sans-serif;
                  -webkit-font-smoothing: antialiased;
                  font-size: 14px;
                  line-height: 1.4;
                  margin: 0;
                  padding: 0;
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%; 
                }
          
                table {
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  width: 100%; }
                  table td {
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top; 
                }
          
                /* -------------------------------------
                    BODY & CONTAINER
                ------------------------------------- */
          
                .body {
                  background-color: #f6f6f6;
                  width: 100%; 
                }
          
                /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                .container {
                  display: block;
                  margin: 0 auto !important;
                  /* makes it centered */
                  max-width: 580px;
                  padding: 10px;
                  width: 580px; 
                }
          
                /* This should also be a block element, so that it will fill 100% of the .container */
                .content {
                  box-sizing: border-box;
                  display: block;
                  margin: 0 auto;
                  max-width: 580px;
                  padding: 10px; 
                }
          
                /* -------------------------------------
                    HEADER, FOOTER, MAIN
                ------------------------------------- */
                .main {
                  background: #ffffff;
                  border-radius: 3px;
                  width: 100%; 
                }
          
                .wrapper {
                  box-sizing: border-box;
                  padding: 20px; 
                }
          
                .content-block {
                  padding-bottom: 10px;
                  padding-top: 10px;
                }
          
                .footer {
                  clear: both;
                  margin-top: 10px;
                  text-align: center;
                  width: 100%; 
                }
                  .footer td,
                  .footer p,
                  .footer span,
                  .footer a {
                    color: #999999;
                    font-size: 12px;
                    text-align: center; 
                }
          
                /* -------------------------------------
                    TYPOGRAPHY
                ------------------------------------- */
                h1,
                h2,
                h3,
                h4 {
                  color: #000000;
                  font-family: sans-serif;
                  font-weight: 400;
                  line-height: 1.4;
                  margin: 0;
                  margin-bottom: 30px; 
                }
          
                h1 {
                  font-size: 35px;
                  font-weight: 300;
                  text-align: center;
                  text-transform: capitalize; 
                }
          
                p,
                ul,
                ol {
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: normal;
                  margin: 0;
                  margin-bottom: 15px; 
                }
                  p li,
                  ul li,
                  ol li {
                    list-style-position: inside;
                    margin-left: 5px; 
                }
          
                a {
                  color: #3498db;
                  text-decoration: underline; 
                }
          
                /* -------------------------------------
                    BUTTONS
                ------------------------------------- */
                .btn {
                  box-sizing: border-box;
                  width: 100%; }
                  .btn > tbody > tr > td {
                    padding-bottom: 15px; }
                  .btn table {
                    width: auto; 
                }
                  .btn table td {
                    background-color: #ffffff;
                    border-radius: 5px;
                    text-align: center; 
                }
                  .btn a {
                    background-color: #ffffff;
                    border: solid 1px #3498db;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: #3498db;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 25px;
                    text-decoration: none;
                    text-transform: capitalize; 
                }
          
                .btn-primary table td {
                  background-color: #3498db; 
                }
          
                .btn-primary a {
                  background-color: #742AFF;
                  border-color: #3498db;
                  color: #ffffff; 
                }
          
                /* -------------------------------------
                    OTHER STYLES THAT MIGHT BE USEFUL
                ------------------------------------- */
                .last {
                  margin-bottom: 0; 
                }
          
                .first {
                  margin-top: 0; 
                }
          
                .align-center {
                  text-align: center; 
                }
          
                .align-right {
                  text-align: right; 
                }
          
                .align-left {
                  text-align: left; 
                }
          
                .clear {
                  clear: both; 
                }
          
                .mt0 {
                  margin-top: 0; 
                }
          
                .mb0 {
                  margin-bottom: 0; 
                }
          
                .preheader {
                  color: transparent;
                  display: none;
                  height: 0;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  visibility: hidden;
                  width: 0; 
                }
          
                .powered-by a {
                  text-decoration: none; 
                }
          
                hr {
                  border: 0;
                  border-bottom: 1px solid #f6f6f6;
                  margin: 20px 0; 
                }
          
                /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
                @media only screen and (max-width: 620px) {
                  table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important; 
                  }
                  table.body p,
                  table.body ul,
                  table.body ol,
                  table.body td,
                  table.body span,
                  table.body a {
                    font-size: 16px !important; 
                  }
                  table.body .wrapper,
                  table.body .article {
                    padding: 10px !important; 
                  }
                  table.body .content {
                    padding: 0 !important; 
                  }
                  table.body .container {
                    padding: 0 !important;
                    width: 100% !important; 
                  }
                  table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important; 
                  }
                  table.body .btn table {
                    width: 100% !important; 
                  }
                  table.body .btn a {
                    width: 100% !important; 
                  }
                  table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important; 
                  }
                }
          
                /* -------------------------------------
                    PRESERVE THESE STYLES IN THE HEAD
                ------------------------------------- */
                @media all {
                  .ExternalClass {
                    width: 100%; 
                  }
                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
                    line-height: 100%; 
                  }
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important; 
                  }
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
                  .btn-primary table td:hover {
                    background-color: #34495e !important; 
                  }
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important; 
                  } 
                }
          
              </style>
            </head>
            <body>
             
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                  <td>&nbsp;</td>
                  <td class="container">
                    <div class="content">
          
                      <!-- START CENTERED WHITE CONTAINER -->
                      <table role="presentation" class="main">
                      <div style="background-color: #742AFF; height: 150px;text-align: center;">
                      <br/> 
    <center><div style="background-color:#f6f6f6; border-radius: 30px; width: 60px; height:58px;">
      <div style="text-align: center; margin: auto;"><span> <img src="cid:images"/></span></div>
    </div></center>
    <br/>
    <h2 style="color: white;">Welcome To TalkApp</h2>
                    </div>
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                         
                          <td class="wrapper">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0"> 
                              
                              <tr>
                                <td>
                                  <p>Hi ${userName}</p>
                                  <p>Thank you for Signing Up with Us. Please Kindly verify Your account with the code Below.</p>
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                    <tbody>
                                      <tr>
                                        <td align="left">
                                          <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tbody >
                                              <tr >
                                              <td >
                                              <Center><div style="margin:auto; text-align: center;"> <a href="#" target="_blank" >${verifyCodee}</a> </div></Center>
                                              </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>Talk App is a platform where you can share your issues with strangers and therapist, and get them solved</p>
                                  <p>Good luck! Hope it works.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
          
                      <!-- END MAIN CONTENT AREA -->
                      </table>
                      <!-- END CENTERED WHITE CONTAINER -->
          
                      <!-- START FOOTER -->
                      <div class="footer">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="content-block">
                              <span class="apple-link">TalkApp Inc, plot 1445 Okonjo Iweala way Utako Abuja <br/> FCT Nigeria.</span>
                         
                            </td>
                          </tr>
                          <tr>
                            <td class="content-block powered-by">
                              Developed by <a href="#">ThreeWM Tech</a>.
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!-- END FOOTER -->
          
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </table>
            </body>
          </html>
            
          
          `,
          attachments: [{
            filename: 'images.png',
            path: path.resolve(`public/images/icons8-checkmark-512.png`),
            cid: 'images' //same cid value as in the html img src
          }]

        }

        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log('Error Occurs', err);
          } else {
            console.log('Email sent !!!');
          }
        })
        if (save) {
          return res.send({
            status: true,
            user: save,
            message: 'Registration Successful',
          })


        }
      } catch (err) {
        res.send({
          status: false,
          message: `Error saving user ${err}`,
          user: null,
        })
      }
    }
  }
}

exports.update = async (req, res) => {
  const _id = req.body._id;
  const userName = req.body.username;
 // const email = req.body.email;
  const phone = req.body.phone;
  const location = req.body.location;

  const saveUpdate = new account({
    _id:_id,
    userName: userName,
    //email: email,
    phone: phone,
    location: location,
   
  });
  console.log(saveUpdate)
  var save = await  account.updateOne({_id:_id }, saveUpdate)

  if (!save) {
    return res.send({
      status: false,
      message: ' Error: Please try again',
      data: null
    });
  } else {
    return res.send({
      status: true,
      message: 'Profile Updated Successfully',
      data: save
    });
  }

},


  exports.UploadVoice = async (req, res) => {
  
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      const dates = Date.now()
      const openCodee = 'user' + Math.floor(100000 + Math.random() * 900000)
      
      console.log('data', files.file.filepath)
      var oldpath = files.file.filepath;
      //.newFilename;
      var newpaths = path.join(__dirname + ".../../public/upload/" + dates + openCodee +files.file.originalFilename)
      

      console.log("=======", dates, oldpath, newpaths)
      var voice = "../uploads/" + dates + openCodee + files.file.originalFilename
     

      fs.rename(oldpath, newpaths, async (err) => {
        // if (err) throw err;
      });
    
      const _id = fields._id;
    
      const saveUpdate = new account({
        _id:_id,
        voice: voice,
       
      });
      var save = await  account.updateOne({_id:_id }, saveUpdate)
   
      if (save) {
        return res.send({
          status: true,
          message: 'Voice upload Successful',
          data: save
        });
      
      }else{
        return res.send({
          status: false,
          message: ' Error: Please try again',
          data: null
        });
      }
    })


    // const upload = multer({ dest: 'public/upload' + dates })
    // // var newpath = "./public/upload/" + dates + files.file;
    // // var voice = "./upload/" + dates + files.file;
    // let uploads = upload.single('file')

    // const userCheck = await account.findOne({ _id: _id });

    // if (!userCheck) {
    //   return res.send({
    //     message: `No User found with this id : ${_id}`,
    //   });
    // } else {
    //   if (
    //     voice == '' ||
    //     voice == null
    //   ) {
    //     return res.send({
    //       status: false,
    //       message:
    //         "Please Upload A voice Note",
    //       data: null,
    //     });
    //   }

    //   else {
    //     let user_update = account.findOneAndUpdate(_id, voice)
    //     user_update.exec((err, data) => {
    //       if (!data) {
    //         return res.send({
    //           status: false,
    //           message: ' Error: Please try again',
    //           data: null
    //         });
    //       } else {
    //         return res.send({
    //           status: true,
    //           message: 'Voice upload Successful',
    //           data: data
    //         });
    //       }
    //     })
    //   }
    //}




  };


  

exports.login = async (req, res, next) => {
  console.log("=====[]good", req.body)
  let email = req.body.email;
  let password = req.body.password;
  // find user, and exclude the pin column
  console.log("good", req.body, req.body.email, password)
  if (email == null || email == '' || password == null || password == '') {
    res.send({
      status: false,
      message: 'Fill out all required',
      data: null,
    })
  } else {

    var check_user =
      await account.findOne({ email: email })
        .then((user) => user)
        .catch(() => null)
    if (!check_user) {
      // If user does not exists
      res.send({
        status: false,
        message: 'Email does not exist',
        data: null,
      })
      // console.log(res)
    } else {

      account
        .findOne({ email: email })

        .then( async (user) => {
          // remember to check verification
          let hash = user.password
          console.log("user", user)
          // Match password
          console.log("user.verification", user.verification)
          if (!bcrypt.compareSync(password, hash)) {
            res.send({
              status: false,
              message: 'Password Incorrect',
              data: null,
            })

          }
          else if (user.verification == 'Pending') {

           try{
            const verifyCodee = JSON.stringify(Math.floor(100000 + Math.random() * 900000))
            let passverifyCode = bcrypt.hashSync(verifyCodee, 10) 


            // let verify = await account.findOneAndUpdate({ email: email },
            //    { verifyCode: passverifyCode},
            //   { new: true },
            // )

            
      const saveUpdate = new account({
        email:email,
        verifyCode: passverifyCode,
       
      });
      var save = await  account.updateOne({email:email }, saveUpdate)
   
      


            let transporter = nodemailer.createTransport({
              service: 'hotmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
              }
            })

            let mailOptions = {
              from: 'talkapps@outlook.com',
              to: `${email}`,
              subject: 'Verify Your Email Address',
              html: `     
          <!doctype html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>TalkApp Mail</title>
              <style>
                /* -------------------------------------
                    GLOBAL RESETS
                ------------------------------------- */
                
                /*All the styling goes here*/
                
                img {
                  border: none;
                  -ms-interpolation-mode: bicubic;
                  max-width: 100%; 
                }
          
                body {
                  background-color: #f6f6f6;
                  font-family: sans-serif;
                  -webkit-font-smoothing: antialiased;
                  font-size: 14px;
                  line-height: 1.4;
                  margin: 0;
                  padding: 0;
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%; 
                }
          
                table {
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  width: 100%; }
                  table td {
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top; 
                }
          
                /* -------------------------------------
                    BODY & CONTAINER
                ------------------------------------- */
          
                .body {
                  background-color: #f6f6f6;
                  width: 100%; 
                }
          
                /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
                .container {
                  display: block;
                  margin: 0 auto !important;
                  /* makes it centered */
                  max-width: 580px;
                  padding: 10px;
                  width: 580px; 
                }
          
                /* This should also be a block element, so that it will fill 100% of the .container */
                .content {
                  box-sizing: border-box;
                  display: block;
                  margin: 0 auto;
                  max-width: 580px;
                  padding: 10px; 
                }
          
                /* -------------------------------------
                    HEADER, FOOTER, MAIN
                ------------------------------------- */
                .main {
                  background: #ffffff;
                  border-radius: 3px;
                  width: 100%; 
                }
          
                .wrapper {
                  box-sizing: border-box;
                  padding: 20px; 
                }
          
                .content-block {
                  padding-bottom: 10px;
                  padding-top: 10px;
                }
          
                .footer {
                  clear: both;
                  margin-top: 10px;
                  text-align: center;
                  width: 100%; 
                }
                  .footer td,
                  .footer p,
                  .footer span,
                  .footer a {
                    color: #999999;
                    font-size: 12px;
                    text-align: center; 
                }
          
                /* -------------------------------------
                    TYPOGRAPHY
                ------------------------------------- */
                h1,
                h2,
                h3,
                h4 {
                  color: #000000;
                  font-family: sans-serif;
                  font-weight: 400;
                  line-height: 1.4;
                  margin: 0;
                  margin-bottom: 30px; 
                }
          
                h1 {
                  font-size: 35px;
                  font-weight: 300;
                  text-align: center;
                  text-transform: capitalize; 
                }
          
                p,
                ul,
                ol {
                  font-family: sans-serif;
                  font-size: 14px;
                  font-weight: normal;
                  margin: 0;
                  margin-bottom: 15px; 
                }
                  p li,
                  ul li,
                  ol li {
                    list-style-position: inside;
                    margin-left: 5px; 
                }
          
                a {
                  color: #3498db;
                  text-decoration: underline; 
                }
          
                /* -------------------------------------
                    BUTTONS
                ------------------------------------- */
                .btn {
                  box-sizing: border-box;
                  width: 100%; }
                  .btn > tbody > tr > td {
                    padding-bottom: 15px; }
                  .btn table {
                    width: auto; 
                }
                  .btn table td {
                    background-color: #ffffff;
                    border-radius: 5px;
                    text-align: center; 
                }
                  .btn a {
                    background-color: #ffffff;
                    border: solid 1px #3498db;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: #3498db;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 25px;
                    text-decoration: none;
                    text-transform: capitalize; 
                }
          
                .btn-primary table td {
                  background-color: #3498db; 
                }
          
                .btn-primary a {
                  background-color: #742AFF;
                  border-color: #3498db;
                  color: #ffffff; 
                }
          
                /* -------------------------------------
                    OTHER STYLES THAT MIGHT BE USEFUL
                ------------------------------------- */
                .last {
                  margin-bottom: 0; 
                }
          
                .first {
                  margin-top: 0; 
                }
          
                .align-center {
                  text-align: center; 
                }
          
                .align-right {
                  text-align: right; 
                }
          
                .align-left {
                  text-align: left; 
                }
          
                .clear {
                  clear: both; 
                }
          
                .mt0 {
                  margin-top: 0; 
                }
          
                .mb0 {
                  margin-bottom: 0; 
                }
          
                .preheader {
                  color: transparent;
                  display: none;
                  height: 0;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  visibility: hidden;
                  width: 0; 
                }
          
                .powered-by a {
                  text-decoration: none; 
                }
          
                hr {
                  border: 0;
                  border-bottom: 1px solid #f6f6f6;
                  margin: 20px 0; 
                }
          
                /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
                @media only screen and (max-width: 620px) {
                  table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important; 
                  }
                  table.body p,
                  table.body ul,
                  table.body ol,
                  table.body td,
                  table.body span,
                  table.body a {
                    font-size: 16px !important; 
                  }
                  table.body .wrapper,
                  table.body .article {
                    padding: 10px !important; 
                  }
                  table.body .content {
                    padding: 0 !important; 
                  }
                  table.body .container {
                    padding: 0 !important;
                    width: 100% !important; 
                  }
                  table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important; 
                  }
                  table.body .btn table {
                    width: 100% !important; 
                  }
                  table.body .btn a {
                    width: 100% !important; 
                  }
                  table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important; 
                  }
                }
          
                /* -------------------------------------
                    PRESERVE THESE STYLES IN THE HEAD
                ------------------------------------- */
                @media all {
                  .ExternalClass {
                    width: 100%; 
                  }
                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
                    line-height: 100%; 
                  }
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important; 
                  }
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
                  .btn-primary table td:hover {
                    background-color: #34495e !important; 
                  }
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important; 
                  } 
                }
          
              </style>
            </head>
            <body>
             
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                  <td>&nbsp;</td>
                  <td class="container">
                    <div class="content">
          
                      <!-- START CENTERED WHITE CONTAINER -->
                      <table role="presentation" class="main">
                      <div style="background-color: #742AFF; height: 150px;text-align: center;">
                      <br/> 
    <center><div style="background-color:#f6f6f6; border-radius: 30px; width: 60px; height:58px;">
      <div style="text-align: center; margin: auto;"><span> <img src="cid:images"/></span></div>
    </div></center>
    <br/>
    <h2 style="color: white;">Welcome To TalkApp</h2>
                    </div>
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                         
                          <td class="wrapper">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0"> 
                              
                              <tr>
                                <td>
                                
                                  <p>Thank you for Signing Up with Us. Please Kindly verify Your account with the code Below.</p>
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                    <tbody>
                                      <tr>
                                        <td align="left">
                                          <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tbody >
                                              <tr >
                                              <td >
                                              <Center><div style="margin:auto; text-align: center;"> <a href="#" target="_blank" >${verifyCodee}</a> </div></Center>
                                              </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p>Talk App is a platform where you can share your issues with strangers and therapist, and get them solved</p>
                                  <p>Good luck! Hope it works.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
          
                      <!-- END MAIN CONTENT AREA -->
                      </table>
                      <!-- END CENTERED WHITE CONTAINER -->
          
                      <!-- START FOOTER -->
                      <div class="footer">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="content-block">
                              <span class="apple-link">TalkApp Inc, plot 1445 Okonjo Iweala way Utako Abuja <br/> FCT Nigeria.</span>
                         
                            </td>
                          </tr>
                          <tr>
                            <td class="content-block powered-by">
                              Developed by <a href="#">ThreeWM Tech</a>.
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!-- END FOOTER -->
          
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </table>
            </body>
          </html>
            
          
          `,

              attachments: [{
                filename: 'images.png',
                path: path.resolve(`public/images/icons8-checkmark-512.png`),
                cid: 'images' //same cid value as in the html img src
              }]

            }

            transporter.sendMail(mailOptions, function (err, data) {
              if (err) {
                console.log('Error Occurs', err);
              } else {
                console.log('Email sent !!!');
              }
            })

            if (save) {
              return res.send({
                status: false,
                message: 'Please verify Your Account',
                data: null,
              });
            
            }

           }catch(err){

           }
            

          }
          else {
            //if Passwords match

            // fetch user wallet and return wallet and user details
            var id = user._id
            account.findOne({ _id: id }).then((userInfo) => {
              if (!userInfo) {
                res.send({
                  status: false,
                  message: 'No record found',
                  data: null,
                })
              } else {
                res.send({
                  status: true,
                  data: userInfo,
                  message: 'Login Successful',
                })
              }
            })
          }
        }
        )
    }

  }
}



exports.verifyAccount = async (req, res) => {
  const _id = req.body._id
  const verifyCode = req.body.verifyCode

  if (_id == null || _id == '' || verifyCode == null || verifyCode == '') {
    res.send({
      status: false,
      message: 'Please enter Code',
      data: null,
    })
  } else {
    // check code 206293
    var check_user = await account
      .findOne({ _id: _id })

      .then((user) => user)
      .catch(() => null)

    if (!check_user) {
      // If user does not exists
      res.send({
        status: false,
        message: 'user does not Exist',
        data: null,
      })
    } else {

      var check = await account.findOne({ _id: _id })
        .then( async(user) => {
          let hash = user.verifyCode;
          if (bcrypt.compareSync(verifyCode, hash)) {
            const veriStatus = 'Approved'
         
            const saveUpdate = new account({
              _id:_id,
              verification: veriStatus,
             
            });
            var save = await  account.updateOne({_id:_id }, saveUpdate)
         
            if (save) {
              return res.send({
                status: true,
                message: 'Account Verified Successfully',
                data: null,
              })
    
    
            }else{
              res.send({
                status: false,
                message: `Error Verifying Your Account`,
                user: null,
              })
            }
          
          } else {
            res.send({
              status: true,
              message: 'Your verificaation Code is incorrect',
              data: null,
            })
          }
        })

    }


  }
}

exports.RecoverPass = async (req, res) => {
  const Email = req.body.email
  account.findOne({ Email: Email }).then((data) => {
    if (!data) {
      return res.send({
        status: false,
        message: 'Email Does Not Exist',
        data: null,
      })
    } else {
      const ConfirmCode = Math.floor(Math.random() * 1234567890)

      let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      })

      // var transporter = nodemailer.createTransport({
      //   host: "smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //     user: "c8783a9dc5dd0a",
      //     pass: "e35a6212fbc7ca"
      //   }
      // });
      console.log("process.env.PASSWORD", process.env.EMAIL, process.env.PASSWORD)
    

      let mailOptions = {
        from: 'paulajogwu@outlook.com',
        to: `${email}`,
        subject: 'Verify Your Email Address',
        html: `

        
             
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>TalkApp Mail</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              
              /*All the styling goes here*/
              
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; 
              }
        
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; 
              }
        
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; 
              }
        
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
        
              .body {
                background-color: #f6f6f6;
                width: 100%; 
              }
        
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; 
              }
        
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px; 
              }
        
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #ffffff;
                border-radius: 3px;
                width: 100%; 
              }
        
              .wrapper {
                box-sizing: border-box;
                padding: 20px; 
              }
        
              .content-block {
                padding-bottom: 10px;
                padding-top: 10px;
              }
        
              .footer {
                clear: both;
                margin-top: 10px;
                text-align: center;
                width: 100%; 
              }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; 
              }
        
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                margin-bottom: 30px; 
              }
        
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; 
              }
        
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px; 
              }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; 
              }
        
              a {
                color: #3498db;
                text-decoration: underline; 
              }
        
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; 
              }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; 
              }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; 
              }
        
              .btn-primary table td {
                background-color: #3498db; 
              }
        
              .btn-primary a {
                background-color: #742AFF;
                border-color: #3498db;
                color: #ffffff; 
              }
        
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; 
              }
        
              .first {
                margin-top: 0; 
              }
        
              .align-center {
                text-align: center; 
              }
        
              .align-right {
                text-align: right; 
              }
        
              .align-left {
                text-align: left; 
              }
        
              .clear {
                clear: both; 
              }
        
              .mt0 {
                margin-top: 0; 
              }
        
              .mb0 {
                margin-bottom: 0; 
              }
        
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; 
              }
        
              .powered-by a {
                text-decoration: none; 
              }
        
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                margin: 20px 0; 
              }
        
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table.body h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; 
                }
                table.body p,
                table.body ul,
                table.body ol,
                table.body td,
                table.body span,
                table.body a {
                  font-size: 16px !important; 
                }
                table.body .wrapper,
                table.body .article {
                  padding: 10px !important; 
                }
                table.body .content {
                  padding: 0 !important; 
                }
                table.body .container {
                  padding: 0 !important;
                  width: 100% !important; 
                }
                table.body .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; 
                }
                table.body .btn table {
                  width: 100% !important; 
                }
                table.body .btn a {
                  width: 100% !important; 
                }
                table.body .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; 
                }
              }
        
              /* -------------------------------------
                  PRESERVE THESE STYLES IN THE HEAD
              ------------------------------------- */
              @media all {
                .ExternalClass {
                  width: 100%; 
                }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; 
                }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; 
                }
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                  font-size: inherit;
                  font-family: inherit;
                  font-weight: inherit;
                  line-height: inherit;
                }
                .btn-primary table td:hover {
                  background-color: #34495e !important; 
                }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; 
                } 
              }
        
            </style>
          </head>
          <body>
           
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" class="main">
                    <div style="background-color: #742AFF; height: 150px;text-align: center;">
                    <br/> 
  <center><div style="background-color:#f6f6f6; border-radius: 30px; width: 60px; height:58px;">
    <div style="text-align: center; margin: auto;"><span> <img src="cid:images"/></span></div>
  </div></center>
  <br/>
  <h2 style="color: white;">Welcome To TalkApp</h2>
                  </div>
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                       
                        <td class="wrapper">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0"> 
                            
                            <tr>
                              <td>
                                <p>Hi ${userName}</p>
                                <p>Thank you for Signing Up with Us. Please Kindly verify Your account with the code Below.</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                          <tbody >
                                            <tr >
                                            <td >
                                            <Center><div style="margin:auto; text-align: center;"> <a href="#" target="_blank" >${verifyCodee}</a> </div></Center>
                                            </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>Talk App is a platform where you can share your issues with strangers and therapist, and get them solved</p>
                                <p>Good luck! Hope it works.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">TalkApp Inc, plot 1445 Okonjo Iweala way Utako Abuja <br/> FCT Nigeria.</span>
                       
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Developed by <a href="#">ThreeWM Tech</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
          
        
        `,

        attachments: [{
          filename: 'images.png',
          path: path.resolve(`public/images/icons8-checkmark-512.png`),
          cid: 'images' //same cid value as in the html img src
        }]

      }

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log('Error Occurs', err);
        } else {
          console.log('Email sent !!!');
        }
      })
    }
  })
}

exports.ResetPass = async (req, res) => {
  const _id = req.body._id
  const oldPass = req.body.oldPass
  const newPass = req.body.newPass

  console.log(req.body)
  if (
    _id == null ||
    _id == '' ||
    oldPass == null ||
    oldPass == '' ||
    newPass == null ||
    newPass == ''
  ) {
    return res.send({
      status: false,
      message: `Please Fill Out All required Field`,
      data: null,
    })
  } else {

    // check id
    var check_id = await account
      .findOne({ _id: _id })
      .then( async (user) => {
        if (!user) {
          return res.send({
            status: false,
            message: 'User Does Not Exist',
            data: null,
          })
        } else {
          let hash = user.password

          // Match password
          if (bcrypt.compareSync(oldPass, hash)) {
            const chpass = bcrypt.hashSync(newPass, 10)

            
            const saveUpdate = new account({
              _id:_id,
              password: chpass,
             
            });
            var save = await  account.updateOne({_id:_id }, saveUpdate)
         
            if (save) {
              return res.send({
                status: true,
                message: 'Password Reset Successful',
                data: null,
              })
    
    
            }
          
          } else {
            //Passwords don't match
            res.send({
              status: false,
              message: 'Old Password is Incorrect',
              data: null,
            })
          }
        }
      })


  }
}

exports.findAll = async (req, res) => {
  const users = await account.find({})
  if (!users) {
    return res.send({
      message: `No users found `,
    })
  }
  console.log('good', users)
  return res.send(users)
}

// Verify Token
function verifyToken(req, res, next) {
  // getting authorization header
  const bearerHeader = req.headers['authorization']
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // split the space coming
    const bearer = bearerHeader.split(' ')
    // get token from array
    const bearerToken = bearer[1]
    //set the token
    req.token = bearerToken
    // move to the next
    next()
  } else {
    //forbidden
    res.sendStatus(403)
  }
}

// var create_new_user = async () => {
//   var doc = await new account({
//     userName,

//     gender,
//     phone,
//     email,
//     password: bcrypt.hashSync(passwordd, 10),
//   })

//     .save({})
//     .then((user) => user)
//     .catch(() => {
//       res.status(500).json({
//         status: false,
//         message: "Error saving user",
//         user: null,
//       });
//     });
//   // send mail with defined transport object

//   if (doc) {
//     new account({
//       email,
//       user_id: doc._id,
//     })
//       .save({})
//       .then((user) => {
//         jwt.sign({ doc },  "jwtSecret", (err, token) => {
//           res.status(200).json({
//             status: true,
//             token,
//             user: doc,
//             message: "Registration Successful",
//           });
//         });
//       })
//       .catch((err) => console.log(err));
//   }
// };
// if (phone == "" || phone == null || phone == undefined) {
//   //Create the user
//   create_new_user();
// } else {
//   // mobi
//   if (!phone) {
//     res.status(400).json({
//       status: false,
//       message: "Referral email does not exists",
//       user: null,
//     });
//   } else {
//     // Create the user
//     create_new_user();
//   }
// }


