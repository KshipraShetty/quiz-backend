const models = require('../../models');

const fetchUsers = () => models.user.findAll();

module.exports = [{
  method: 'GET',
  path: '/fetchUsers',
  handler: (req, resp) =>
    fetchUsers()
      .then((allUsers) => {
        resp(allUsers);
      }),
}];
