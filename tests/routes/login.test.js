const server = require('../../src/server');

describe('Check for login api', () => {
  test('Check for statusCode of a valid username', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'hello',
      },
    };
    server.inject(options)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test('Check for a statusCode of invalid user entry', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 0,
      },
    };
    server.inject(options)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
