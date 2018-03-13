const models = require('../../models');

// const populateQuestionDb = require('../../src/helper/populateQuestionDatabase');

describe('Testing the helper function populate database with questions', () => {
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
    models.question.destroy({ cascade: true, truncate: true }).then(() => {
    //  console.log('BEFORE');
      done();
    });
  });
  test('Should return length 0 for finding questions in empty table', (done) => {
    models.question.findAll().then((answerArray) => {
      expect(answerArray.length).toBe(0);
      done();
    });
  });
  test('Should return length > 0 for finding questions in a table having questions already', (done) => {
    models.question.bulkCreate(question).then(() => {
      models.question.findAll().then((answerArray) => {
        expect(answerArray.length).not.toBe(0);
        done();
      });
    });
  });
  afterAll((done) => {
    models.questions.destroy({
      truncate: 'true',
    }).then(() => {
    //  console.log('AFTER');
      done();
    });
  });
});
