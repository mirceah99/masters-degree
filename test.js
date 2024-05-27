const axios = require('axios');
const config = require('./config')
let successOperations = 0;
const createAuthToken =  (userName) =>{
    return axios.get(`${config.DOMAIN}/getToken?userName=${userName}`).then(response => response.data.token);
}
const getUsername = ()=>{
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    const minLength = 5;
    const maxLength = 30; // as you can imagine from test to test some test can be more unlucky and generate longer usernames

    const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let userName = '';

    for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        userName += characters[randomIndex];
    }

    return userName;
}
const runParallelAsync = async (operation, times) => {
    const promises = [];
    for(let i= 0; i<times; i++){
        promises.push(operation());
    }
    const results= await Promise.allSettled(promises);
    return results.map(result=> result.status === 'fulfilled' ? result.value : null)
}
const main = async () =>{
    const startTime = new Date();
    let run = true;
    while(run){
        const tokens = await runParallelAsync(createAuthToken.bind(this, getUsername()), config.REQUESTS_IN_PARALLEL);
        for(const token of tokens){
            token && successOperations++;
            console.log(token)
            if(successOperations >= config.TARGET_NR_OF_SUCCESS_REQUESTS){
                run = false;
                break;
            }
        }
        console.log(`successOperations => ${successOperations}`);
    }
    console.log(`total running time: ${( Date.now()- startTime.getTime())/1_000}`)
}

 main();
