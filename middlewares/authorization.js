const { user_role, user_access, article } = require('../models')

const authorizationRole = (req,res,next) => {
    const id = req.params.id;
    const UserId = req.userData.id

    user_role.findOne({
        where: {
            userId : UserId
        }
    }).then(element =>{
        if(element.roleId == 1){
            next();
        } else {
            throw {
                status : 403,
                msg: "User doesn't have any access"
            }
        }
    }).catch(err =>{
        res.status(500).json(err)
    })
}

// const authorizationAccessStore = (req,res,next) => {
//     const UserId = req.userData.id;

//     user_access.findAll({
//         where: {
//             userId: UserId
//         }
//     }).then(element =>{
//         let temp = [];
//         temp += element;
//         console.log(temp);
//         // if(element.accessId === 1){
//         //     next();
//         // } else {
//         //     res.status(401).json({message: "Sorry you don't have any acccess!"})
//         // }
//     }).catch(err =>{
//         res.status(500).json(err)
//     })

// }

class access {
    static async store (req, res, next){
        const userId = req.userData.id;
        let accessId = 1;

        try {
            const found = await user_access.findOne({where: { userId, accessId}});
            if (found){
                next();
            } else {
                res.status(401).json({message: "Sorry you don't have any acccess!"})
            }
        } catch (err) {
            next (err);
        }
    }

    static async update (req, res, next){
        const userId = req.userData.id;
        const id = req.params.id;

        try {
            const found = await article.findOne({where: {id}});
            if(found.userId === userId){
                let accessId = 3;
                const find = await user_access.findOne({where: {userId, accessId}});
                if(find){
                    next();
                } else {
                    res.status(401).json({message: "Sorry you don't have any acccess!"});
                }
            } else {
                let accessId = 2;
                const find = await user_access.findOne({where: {userId, accessId}});
                if(find){
                    next();
                } else {
                    res.status(401).json({message: "Sorry you don't have any acccess!"});
                }
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = {authorizationRole, access};

// if (found.userId === userId){
//     const find = await user_access.findAll({where: {userId}})
//     find.forEach(element => {
//         if(element.accessId === 3){
//             console.log("masuk1")
//             console.log(element.accessId);
//             next();
//         } else {
//             res.status(401).json({message: "Sorry you don't have any acccess!"})
//         }
//     });
// } else {
//     const find = await user_access.findAll({where: {userId}})
//     find.forEach(element => {
//         if(element.accessId === 2){
//             console.log("masuk2")
//             console.log(element.accessId);
//             next();
//         } else {
//             res.status(401).json({message: "Sorry you don't have any acccess!"})
//         }
//     });
// }