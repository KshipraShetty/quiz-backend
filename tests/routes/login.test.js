const server = require('../../src/server');
const models = require('../../models');

describe('Check for login api', () => {
  beforeAll((done) => {
    models.user.create({
      username: 'hello',
    }).then(() => done());
  });
  test('Check for statusCode for a new user', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'newUser',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  }, 15000);
  test('Check for statusCode for a existing user', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'hello',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(200);
      done();
    });
  }, 15000);
  test('Check for a statusCode of invalid user entry interms of type', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 0,
      },
    };
    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(400);
      done();
    });
  });

  test('Check for a statusCode of invalid user entry interms of length', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'a',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(400);
      done();
    });
  });
  afterAll((done) => {
    models.user.destroy({
      where: {
        username: 'hello',
      },
    }).then(() => done());
  });
});
