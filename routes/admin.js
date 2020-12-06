const { Router } = require('express');
const router = Router();
const adminController = require('../controllers/admincontroller');
const autho = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.use(auth);
router.use(autho.authorizationRole);
router.post('/add/:id', adminController.giveAccess);
router.delete('/delete/:id', adminController.deleteAccess);
router.get('/user/:id', adminController.getUserAccessById);

module.exports = router;