const server = require('../../src/server');
const models = require('../../models');

describe('Testing POST option request', () => {
  beforeAll((done) => {
    models.user.upsert({
      id: 10,
      username: 'user',
    }).then(() => {
      done();
    }).catch();
  });

  test('Responds with 200 statusCode', (done) => {
    const options = {
      method: 'POST',
      url: '/populateUserAnswer',
      payload: {
        userId: 10,
        questionId: 12,
        answer: 'New Delhi',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  afterAll((done) => {
    models.user.destroy({
      where: {},
    }).then(() => {
      done();
    }).catch();
  });
});
