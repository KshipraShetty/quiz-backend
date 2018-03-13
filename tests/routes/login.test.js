const server = require('../../src/server');
const models = require('../../models');

describe('Check for login api', () => {
  const question = [{
    questionId: 12,
    question: 'What is the capital of India',
    option: {
      option1: 'New Delhi',
      option2: 'MP',
      option3: 'UP',
      option4: 'Bangalore',
    },
  }];
  const answer = [{
    questionId: 12,
    answer: 'New Delhi',
  }];
  beforeAll((done) => {
    models.user.create({
      username: 'hello',
    }).then(() => {
      models.question.bulkCreate(question)
        .then(() => {
          models.answer.bulkCreate(answer)
            .then(() => done());
        });
    });
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
  });
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
  });
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
    }).then(() => {
      models.question.destroy({
        where: {},
      })
        .then(() => {
          models.answer.destroy({
            where: {},
          }).then(() => done());
        });
    });
  });
});
