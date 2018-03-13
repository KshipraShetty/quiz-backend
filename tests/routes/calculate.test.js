const server = require('../../src/server');
const models = require('../../models');

const question = [{
  questionId: 12,
  question: 'What is the capital of India',
  option: {
    option1: 'New Delhi',
    option2: 'MP',
    option3: 'UP',
    option4: 'Bangalore',
  },

},
{
  questionId: 23,
  question: 'What is the capital of Afghanistan',
  option: {
    option1: 'Kabul',
    option2: 'Tirana',
    option3: 'Algiers',
    option4: 'Andorra la Vella',
  },
},
{
  questionId: 45,
  question: 'What is the capital of Marshall Islands',
  option: {
    option1: 'Kabul',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
  },
},
{
  questionId: 56,
  question: 'What is the capital of Micronesia',
  option: {
    option1: 'Palikir',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
  },

},
{

  questionId: 67,
  question: 'What is the capital of Monaco',
  option: {
    option1: 'Palikir',
    option2: 'Monaco',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
  },
}];

const answer = [{
  questionId: 12,
  answer: 'New Delhi',
},
{
  questionId: 67,
  answer: 'Majuro',
},
{
  questionId: 23,
  answer: 'Kabul',
},
{
  questionId: 45,
  answer: 'Majuro',
},
{
  questionId: 56,
  answer: 'Palikir',
}];


const user = [{
  id: 1,
  username: 'hello',
},
{
  id: 2,
  username: 'lol',
}];

const userAnswer = [{
  userId: 1,
  questionId: 12,
  answer: 'New Delhi',
},
{
  userId: 1,
  questionId: 67,
  answer: 'Majuro',
},
{
  userId: 1,
  questionId: 23,
  answer: 'Kabul',
},
{
  userId: 1,
  questionId: 45,
  answer: 'Majuro',
},
{
  userId: 1,
  questionId: 56,
  answer: 'Palikir',
},
{
  userId: 2,
  questionId: 12,
  answer: 'Majuro',
},
{
  userId: 2,
  questionId: 67,
  answer: 'Majuro',
},
{
  userId: 2,
  questionId: 23,
  answer: 'Majuro',
},
{
  userId: 2,
  questionId: 45,
  answer: 'Majuro',
},
{
  userId: 2,
  questionId: 56,
  answer: 'Majuro',
}];

beforeAll((done) => {
  models.question.bulkCreate(question)
    .then(() => {
      models.answer.bulkCreate(answer);
      // .then(() => {
      models.user.bulkCreate(user)
        .then(() => {
          models.useranswer.bulkCreate(userAnswer)
            .then(() => {
              done();
            });
        });
      // });
    });
});
describe('Testing POST calulateScore request', () => {
  test('Responds with 200 statusCode', (done) => {
    const options = {
      method: 'POST',
      url: '/calculateScore',
      payload: {
        userId: 1,
      },
    };

    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });


  test('Should return proper score object', (done) => {
    const options = {
      method: 'POST',
      url: '/calculateScore',
      payload: {
        userId: 1,
      },
    };
    const output = [{ score: 5, userId: 1, username: 'hello' }];
    server.inject(options, (response) => {
      expect((response.result)).toEqual(output);
      done();
    });
  });

  test('Should return proper leaderBoard', (done) => {
    const options = {
      method: 'POST',
      url: '/calculateScore',
      payload: {
        userId: 2,
      },
    };
    const output = [{ score: 5, userId: 1, username: 'hello' }, { score: 2, userId: 2, username: 'lol' }];
    server.inject(options, (response) => {
      expect((response.result)).toEqual(output);
      done();
    });
  });
  afterAll((done) => {
    models.user.destroy({
      where: {
      },
    })
      .then(() => {
        models.question.destroy({
          where: {},
        })
          .then(() => {
            models.useranswer.destroy({
              where: {},
            });
          }).then(() => done());
      });
  });
});
