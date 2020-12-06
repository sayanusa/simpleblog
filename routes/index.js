const { Router } = require('express');
const router = Router();

router.get('/', (req,res) =>{
    res.send('Testing');
});

//user section
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', userController.getUser);

//admin section
const adminRoutes = require('./admin');
router.use('/admin', adminRoutes);

//role section
const roleController = require('../controllers/roleController');

router.get('/role', roleController.getRole);
router.post('/role/add', roleController.addRole);
router.delete('/role/delete/:id', roleController.deleteRoleById);

//access section
const accessController = require('../controllers/accessController');

router.get('/access', accessController.getAccess);
router.post('/access/add', accessController.addAccess);
router.delete('/access/delete/:id', accessController.deleteAccessById);

//article section
const articleRoutes = require('./article');
router.use('/article', articleRoutes);

module.exports = router;