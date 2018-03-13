const models = require('../../models');
const fetchQuestionDB = require('../../src/helper/fetchQuestionDatabase');

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

beforeAll((done) => {
  models.question.bulkCreate(question)
    .then(() => done());
});

describe('Check for fetch question helper', () => {
  test('Check if length is > 0', (done) => {
    fetchQuestionDB()
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
    .then(() => done());
});
