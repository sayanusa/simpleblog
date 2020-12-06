const { user, user_access, access } = require('../models');

class adminController {
    static async giveAccess (req, res, next){
        const id = req.params.id;
        const { accessId } = req.body;
        const userId = id;

        try {
            const found = await user.findOne({where: {id : id}})

            if(found){
                const check = await user_access.findOne({where: {
                    userId: id, accessId
                }});
                if(check){
                    res.status(409).json({message: "This user already given an access!"})
                } else {
                    const give = await user_access.create({userId, accessId});
                    res.status(201).json({
                        message: "access granted!",
                        data: give
                    })
                }
            } else {
                res.status(400).json({message: "user not found!"})
            }
        } catch (err) {
            next (err);
        }
    }

    static async deleteAccess (req, res, next){
        const id = req.params.id;
        const { accessId } = req.query;
        try {
            const found = await user_access.findOne({where: {
                userId: id, accessId
            }})
            if(found){
                const boom = await user_access.destroy({where: {
                userId: id, accessId
            }})
                res.status(200).json({message: "access successfully deleted!"})
            } else {
                res.status(400).json({message: "user not found!"})
            }
        } catch (err) {
            next (err);
        }
    }

    static async getUserAccessById (req, res, next){
        const userId = req.params.id;
        try {
            const found = await user_access.findAll({where: { userId }});
            res.status(200).json({
                message: "user access list",
                data: found
            })
        } catch (err) {
            next (err);
        }
    }

}

module.exports = adminController;