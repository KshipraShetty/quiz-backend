const models = require('../../models');

const populateAnswerDb = require('../../src/helper/populateAnswers');
// const populateQuestionDb = require('../../src/helper/populateQuestionDatabase');

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

describe('Testing the helper function populate answer database', () => {
  beforeAll((done) => {
    models.answer.destroy({ cascade: true, truncate: true }).then(() => {
      console.log('BEFORE');
      done();
    });
  });
  test('Should return length 0 in empty table', (done) => {
    models.answer.findAll().then((answerArray) => {
      expect(answerArray.length).toBe(0);
      done();
    });
  });


  // test('Get data from external url', (done) => {
  //   helpers.getDataFromURL(`${constants.answersURL}/23`).then((data) => {
  //     const dataJSON = JSON.parse(data);
  //     expect(dataJSON.answer).toBe('Kabul');
  //   done();

  //   });


  test('Should return an array of resolved promises', done =>
    models.question.bulkCreate(question).then(() => {
      populateAnswerDb().then((data) => {
        data.forEach((eachProm) => {
          expect(eachProm).toBeInstanceOf(Promise);
          done();
        });
      });
    }));

  //   test('Should return length > 0', (done) => {
  //     models.user.count()
  //       .then((count) => {
  //         expect(count).not.toBe(0);
  //         done();
  //       });
  //   });
  afterAll((done) => {
    models.answer.destroy({
      truncate: 'true',
    }).then(() => {
      console.log('AFTER');
      done();
    });
  });
});
