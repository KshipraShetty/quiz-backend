const models = require('../../models');


beforeEach((done) => {
  models.useranswer.bulkCreate({
    userId: 1,
    questionId: 12,
    answer: 'New Delhi',
  })
    .then(() => done());
});


describe('Check for useranswer model', () => {
  test('Should return true and an object for new entry', (done) => {
    models.useranswer.destroy({ where: {} });
    models.useranswer.presentOrNot(1, 12, 'New Delhi')
      .spread((createdObj, created) => {
        expect(created).toBe(true);
        expect(createdObj).toBeInstanceOf(Object);
        done();
      });
  });
  test('Should return false for old entry', (done) => {
    // models.useranswer.bulkCreate({
    //   userId: 1,
    //   questionId: 12,
    //   answer: 'New Delhi',
    // })
    //   .then(() => {
    models.useranswer.presentOrNot(1, 12, 'New Delhi')
      .spread((createdObj, created) => {
        expect(created).toBe(false);
        done();
      });
  });

  test('should return >0 when found one user with a particular question', (done) => {
    models.useranswer.findOneUser(1, 12)
      .then((user) => {
        expect(user.length).not.toBe(0);
        done();
      });
  });

  test('Should return 1 for all the answers of a particular user', (done) => {
    models.useranswer.findAllUserAnswers(1)
      .then((user) => {
        console.log(user);

        expect(user.length).toBe(1);
        done();
      });
  });
});

afterAll((done) => {
  models.useranswer.destroy({ where: {} })
    .then(() => done());
});
