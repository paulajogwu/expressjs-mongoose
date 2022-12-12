const router = require("express").Router();
const {createUser} = require('../controller/userController');

router.post('/create/user',createUser);
// router.get('/users/getall',findAll);
// router.get('/user/profile',findOne);
// router.put('/user/edit/:id',update);
// router.post('/user/login',login);
// router.post('/profile/image',updateImage);
// router.delete('/user/delete/:id',deleteOne);


module.exports = router;