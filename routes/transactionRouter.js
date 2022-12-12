const router = require("express").Router();
const {getBalance,MakaPay,getTransaction,findAll} = require('../controller/transactionController');

router.post('/create/wallet_pay',MakaPay);
router.get('/user/balance/:_id',getBalance);
router.get('/user/transaction/:_id',getTransaction);
router.get('/users/all_transaction',findAll);
// router.put('/user/edit/:id',update);
// router.post('/user/login',login);
// router.post('/profile/image',updateImage);
// router.delete('/user/delete/:id',deleteOne);


module.exports = router;