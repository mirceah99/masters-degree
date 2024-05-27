const config =  { REQUESTS_IN_PARALLEL: 300,
    TARGET_NR_OF_SUCCESS_REQUESTS: 10_000,
    DOMAIN: {mircea: 'http://localhost:3000', classic:'http://localhost:3001'},
    TARGET_NR_OF_SUCCESS_REQUESTS_ARRAY: [1_000, 3_000, 5_000, 10_000, 15_000, 20_000 ,25_000] };

module.exports = config;
