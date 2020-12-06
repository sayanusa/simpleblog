const { Router } = require('express');
const router = Router();
const articleController = require('../controllers/articleController');
const autho = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');



router.get('/user', auth, articleController.getArticleByUserId);
router.get('/find/:id', articleController.getArticleById);
router.use(auth);
router.use(autho.access.store);
router.post('/create', articleController.createArticle);
router.put('/edit/:id', autho.access.update, articleController.updateArticle);

module.exports = router;