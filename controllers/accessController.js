const { access } = require('../models');

class accessController {
    static async getAccess (req, res, next){
        try {
            const found = await access.findAll({});
            if (found){
                res.status(200).json({
                    role: found
                })
            } else {
                next({message: "Access still empty"});
            }
        } catch (err) {
            next(err);
        }
    }

    static async addAccess (req, res, next){
        const { name } = req.body;
        try {
            const found = await access.findOne({where: {name}});
            if (found){
                res.status(409).json({msg: "access already exist"});
            } else {
                const add = await access.create({name});

                res.status(201).json({add});
            }
        } catch (err) {
            next (err);
        }
    }

    static async deleteAccessById (req, res, next){
        const { id } = req.params;
        try {
            const search = await access.destroy({where: {id}})
            if(search){
                res.status(200).json({message: "access deleted"})
            } else{
                res.status(400).json({message: "access deleted failed"})
            }
        } catch (err) {
            next (err);
        }
    }
}

module.exports = accessController;