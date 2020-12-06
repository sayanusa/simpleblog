const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const tokenGenerator = (user) => {
    return jwt.sign({
        id: user.id,
        fullname: user.fullname,
        email:user.email,
        gender:user.gender
    },secretKey)
}

const tokenVerifier = (token) => {
    return jwt.verify(token,secretKey)
}

module.exports = {
    tokenGenerator, tokenVerifier
}
