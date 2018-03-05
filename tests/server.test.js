const server = require('../src/server.js');

describe('backend for quiz app', () => {
  test('Check if server is up', (done) => {
    server.inject('/', (response) => {
      expect(response.statusCode).toBe(200);
    });
    done();
  });
});
