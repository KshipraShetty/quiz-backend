const hapi = require('hapi');
const routes = require('./routes');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 9000,
});

server.route(routes);

if (!module.parent) {
  server.start((error) => {
    if (error) {
      console.log(error);
    }
    console.log('Server connected!');
  });
}

module.exports = server;
