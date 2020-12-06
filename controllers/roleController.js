const { role } = require('../models');

class roleController {
    static async getRole (req, res, next){
        try {
            const found = await role.findAll({});
            if (found){
                res.status(200).json({
                    role: found
                })
            } else {
                next({message: "Role still empty"});
            }
        } catch (err) {
            next(err);
        }
    }

    static async addRole (req, res, next){
        const { name } = req.body;
        try {
            const found = await role.findOne({where: {name}});
            if (found){
                res.status(409).json({msg: "role already exist"});
            } else {
                const add = await role.create({name});

                res.status(201).json({add});
            }
        } catch (err) {
            next (err);
        }
    }

    static async deleteRoleById (req, res, next){
        const { id } = req.params;
        try {
            const search = await role.destroy({where: {id}})
            if(search){
                res.status(200).json({message: "role deleted"})
            } else{
                res.status(400).json({message: "role deleted failed"})
            }
        } catch (err) {
            next (err);
        }
    }
}

module.exports = roleController;