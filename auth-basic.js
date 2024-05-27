const jwt = require('jsonwebtoken');
const SECRET = 'SECRET';

const getToke = (userName)=>{
    return jwt.sign({userName}, SECRET)
}

module.exports = getToke;
