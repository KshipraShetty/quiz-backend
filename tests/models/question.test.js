const models = require('../../models');


beforeEach((done) => {
  models.question.destroy({ where: {} })
    .then(() => done());
});


describe('Check for question model', () => {
  test('Should return 0', (done) => {
    models.question.findAllQuestions()
      .then((allQs) => {
        expect(allQs.length).toBe(0);
        done();
      });
  });
  test('Should return >0', (done) => {
    const quests = [{

      questionId: 67,
      question: 'What is the capital of Monaco',
      option: {
        option1: 'Palikir',
        option2: 'Monaco',
        option3: 'Majuro',
        option4: 'Andorra la Vella',
      },
    }];
    models.question.createQuestions(quests)
      .then((allQs) => {
        expect(allQs.length).not.toBe(0);
        done();
      });
  });
});

afterAll((done) => {
  models.question.destroy({ where: {} })
    .then(() => done());
});
