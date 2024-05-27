
const crypto = require('crypto');
const SECRET = 'SECRET';
const getToke = (userName)=> {
    const payload = `{"userName": "${userName}"}`;
    const secret = crypto.createHmac('sha256', SECRET).update(payload).digest("hex");
    return JSON.stringify({userName, secret, iat: Date.now() });
}

module.exports = getToke;
