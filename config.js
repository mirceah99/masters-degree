const config = {
    REQUESTS_IN_PARALLEL: 200,
    TARGET_NR_OF_SUCCESS_REQUESTS: 10_000,
    DOMAIN: {mircea: 'http://localhost:3000', classic: 'http://localhost:3001'},
    TARGET_NR_OF_SUCCESS_REQUESTS_ARRAY: [1_000, 2_500, 3_000, 4_000, 5_000, 6_000,
        8_000, 10_000, 12_000, 15_000, 18_000, 20_000, 25_000]
};

module.exports = config;
