const models = require('../../models');
const fetchAnswerDB = require('../../src/helper/fetchQuestionDatabase');

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
},
];

beforeAll((done) => {
  models.question.bulkCreate(question)
    .then(() => {
      models.answer.bulkCreate(answer)
        .then(() => done());
    });
});

describe('Check for fetch answer helper', () => {
  test('Check if length is > 0', (done) => {
    fetchAnswerDB()
      .then((count) => {
        expect(count.length).not.toBe(0);
        done();
      });
  });
});

afterAll((done) => {
  models.question.destroy({
    where: {},
  })
    .then(() => {
      models.answer.destroy({
        where: {
        },
      })
        .then(() => done());
    });
});
