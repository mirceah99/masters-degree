
const crypto = require('crypto');
const SECRET = 'SECRET';
const getToke = (userName)=> {
    const payload = JSON.stringify({userName});
    const secret = crypto.createHmac('sha256', SECRET).update(payload).digest("hex");
    return JSON.stringify({payload, secret, iat: Date.now() });
}

module.exports = getToke;
