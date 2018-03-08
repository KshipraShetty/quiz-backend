const login = require('./login');
const populateUserAnswer = require('./populateUserAnswer');
const calculateScore = require('./calculate');
const fetchUsers = require('./fetchUsers');

module.exports = [].concat(login, populateUserAnswer, calculateScore, fetchUsers);
