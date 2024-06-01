const axios = require('axios');
const config = require('./config')
const createChart = require('./chart')
const http = require('http');
const httpAgent = new http.Agent({keepAlive: true});
const axiosInstance = axios.create({
    httpAgent,
});
const createAuthToken = (userName, domain) => {
    return axiosInstance.get(`${domain}/getToken?userName=${userName}`).then(response => response.data.token);
}

const getUsername = () => {
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
    for (let i = 0; i < times; i++) {
        promises.push(operation());
    }
    const results = await Promise.allSettled(promises);
    return results.map(result => result.status === 'fulfilled' ? result.value : null)
}
const testPerformance = async (numberOfOperations, method) => {
    const startTime = new Date();
    console.log(`METHOD[${method}] numberOfOperations => ${numberOfOperations}`);
    let successOperations = 0;
    let run = true;
    while (run) {
        const tokens = await runParallelAsync(createAuthToken.bind(this, getUsername(), config.DOMAIN[method]), config.REQUESTS_IN_PARALLEL);
        for (const token of tokens) {
            token && successOperations++;
            if (successOperations >= numberOfOperations) {
                run = false;
                break;
            }
        }
    }
    const totalTime = (Date.now() - startTime.getTime()) / 1_000;
    console.log(`METHOD[${method}] total running time: ${totalTime}`)
    return totalTime;
}

async function main() {
    const methods = ['mircea', 'classic'];
    const results = [];
    for (const method of methods) {
        const times = [];
        for (const numberOfSuccessRequests of config.TARGET_NR_OF_SUCCESS_REQUESTS_ARRAY) {
            times.push(await testPerformance(numberOfSuccessRequests, method));
        }
        results.push({label: method, data: times})
    }
    await createChart(config.TARGET_NR_OF_SUCCESS_REQUESTS_ARRAY, ...results, 'Generation of JWT')
}

main();
