const {tokenVerifier} = require('../helpers/jwt');

const authentication = (req,res,next) => {
    const {token} = req.headers;
    if(!token){
        res.status(404).json({message: 'Please Login first!'})
    }else{
        try{
            const decode = tokenVerifier(token);
            req.userData = decode;
            next()
        }catch(err){ 
            res.status(500).json({message: err.message}
        )}
    }
}

module.exports = authentication;