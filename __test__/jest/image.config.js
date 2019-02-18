const base = require(__dirname + '/base.config');

module.exports = {
    ...base,
    globals: {
        __ENV__: {
            DEFAULT_TEST_PORT: 3000
        }
    },
    preset: 'jest-puppeteer',
    testMatch: ['<rootDir>/__test__/**/*.test.image.js']
};