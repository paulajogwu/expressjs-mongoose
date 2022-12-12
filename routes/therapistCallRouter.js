const router = require("express").Router();
const {createCall} = require('../controller/therapistCallController');

router.post('/create/video_call',createCall);
// router.get('/users/getall',findAll);
// router.get('/user/profile',findOne);
// router.put('/user/edit/:id',update);
// router.post('/user/login',login);
// router.post('/profile/image',updateImage);
// router.delete('/user/delete/:id',deleteOne);


module.exports = router;