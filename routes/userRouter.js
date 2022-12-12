const router = require("express").Router();

const {createUser,login,verifyAccount,
    findAll, update, UploadVoice, ResetPass 
} = require('../controller/userController');

router.post('/create/user',createUser);
router.get('/users/getall',findAll);
// router.get('/user/profile',findOne);
router.post('/user/edit',update);
router.post('/user/login',login);
router.post('/user/voicenote',UploadVoice);
router.post('/account/verify',verifyAccount);
router.post('/user/reset_password',ResetPass);
// router.delete('/user/delete/:id',deleteOne);


module.exports = router;