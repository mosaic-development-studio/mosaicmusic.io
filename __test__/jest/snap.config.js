const base = require(__dirname + '/base.config');

module.exports = {
    ...base,
    testMatch: ['<rootDir>/__test__/**/*.test.snap.js']
};