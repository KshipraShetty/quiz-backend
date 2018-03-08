const login = require('./login');
const populateUserAnswer = require('./populateUserAnswer');
const calculateScore = require('./calculate');

module.exports = [].concat(login, populateUserAnswer, calculateScore);
