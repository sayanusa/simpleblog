const { user, user_role, user_access, role } = require('../models');
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

class userController {
    static async register(req, res, next){
        const { fullName, email, password, gender } = req.body;
        let role = Number(req.body.role) || 2;

        try {
            const found = await user.findOne({where: {email}})
            if(found){
                res.status(409).json({message: "Email already in use"});
            } else {
            const secret = await user.create({fullName, email, password, gender})
            let userId = secret.id;
            let roleId = role;
            //set role
            const roleStatus = await user_role.create({userId, roleId})
            //if as admin, auto set has all access
            if(role == 1){
                for (let i=1; i<=3; i++){
                    let accessId = i;
                    const accessStatus = await user_access.create({userId, accessId});
                }
            }
            if(secret){
                const token = tokenGenerator(secret)
                res.status(200).json({token: token});
            }else{
                res.status(400).json({message: "There is something wrong with the input"});
            }
            }
        } catch (err) {
            next (err)
        }
    }

    static async login (req, res, next){
        const {email,password} = req.body;
        email == null ? "Email field is required" : email;
        password == null ? "Password field is required" : password;

        try{
            const found = await user.findOne({where: {email}})
            if(found){
                if(decryptPwd(password,found.password)){
                    const token = tokenGenerator(found);
					res.status(200).json({token});
                }else{
                    next({message: "invalid password"});
                }                                
            }else{
                next({message: "Email not found"})
            }
        }catch(err){
            next(err)
        }  
    }
    
    static async getUser (req, res, next){
        const found = await user_role.findAll({
            include: [user, role]
        });
        res.status(200).json({
            user: found
        })
    }

}

module.exports = userController;