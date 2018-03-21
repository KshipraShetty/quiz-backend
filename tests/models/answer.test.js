const models = require('../../models');


beforeEach((done) => {
  models.answer.bulkCreate({
    questionId: 12,
    answer: 'New Delhi',
  })
    .then(() => done());
});


describe('Check for answer model', () => {
  test('Should create an answer', (done) => {
    models.answer.destroy({ where: {} });
    models.answer.createAnswer(12, 'New Delhi')
      .then((answers) => {
        expect(answers.answer.length).not.toBe(0);
        done();
      });
  });
  test('Should findAll answers', (done) => {
    models.answer.findAllAnswers()
      .then((ans) => {
        expect(ans.length).toBe(1);
        done();
      });
  });
});

afterAll((done) => {
  models.answer.destroy({ where: {} })
    .then(() => done());
});
