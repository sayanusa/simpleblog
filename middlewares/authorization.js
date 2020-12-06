const { user_role } = require('../models')

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

const authorizationAccess = (req,res,next) => {


}

module.exports = {authorizationRole, authorizationAccess};
