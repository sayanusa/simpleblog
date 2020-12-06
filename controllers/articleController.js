const { article } = require('../models');

class articleController {
    static async createArticle (req, res, next){
        const userId = req.userData.id;
        const { title, body } = req.body;

        try {
            const found = await article.findOne({
                where: {title}
            });
            if (found){
                res.status(409).json({message: "Title already exist!"});
            } else {
                const add = await article.create({
                    userId,
                    title,
                    body
                });
                res.status(201).json({
                    message: "Article created!",
                    data: add
                })
            }
        } catch (err) {
            next (err);
        }
    }

    static async getArticleById (req, res, next){
        const id = req.params.id;

        try {
            const found = await article.findOne({where: {id}});
            if (found){
                res.status(200).json({article: found});
            } else {
                res.status(400).json({message: "article not found!"});
            }
        } catch (err) {
            next (err);
        }

    }

    static async getArticleByUserId (req, res, next){
        const userId = req.userData.id;
        
        try {
            const find = await article.findOne({where: {userId}});
            if (find){
                const found = await article.findAll({where: {userId}});
                res.status(200).json({article: found});
            } else {
                res.status(400).json({message: "article not found!"});
            }
        } catch (err) {
            next (err);
        }
    }

    static async updateArticle (req, res, next){
        const id = req.params.id;
        const { title, body } = req.body;

        try {
            const found = await article.findOne({
                where: {title}
            });
            if (found){
                res.status(409).json({message: "Title already exist!"});
            } else {
                const find = await article.update({
                    title,
                    body
                },{
                    where: {id}
                });
                res.status(204).json({
                    message: "Article updated!",
                    data: find
                })
            }
        } catch (err) {
            next (err);
        }

    }

}

module.exports = articleController;