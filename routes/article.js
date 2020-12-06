const { Router } = require('express');
const router = Router();
const articleController = require('../controllers/articleController');
const autho = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.use(auth);
router.use(autho.authorizationAccess);

module.exports = router;