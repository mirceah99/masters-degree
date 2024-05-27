const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let port;
let getToken;
if(process.env.METHOD === 'mircea'){
    getToken = require('./auth-mircea');
    port = 3000;
}else {
    getToken = require("./auth-basic");
    port = 3001;
}
app.use(bodyParser.json());

app.get('/getToken', (req, res) => {
    const { userName } = req.query;
    if (!userName) {
        return res.status(400).json({ error: 'userName is required' });
    }

    const token = getToken(userName);
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
