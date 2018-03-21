const models = require('../../models');


beforeEach((done) => {
  models.score.destroy({ where: {} })
    .then(() => done());
});


describe('Check for score model if the score is present or not', () => {
  test('Should return true and an object', (done) => {
    models.score.findOrCreateScore(1, 3)
      .spread((createdObj, created) => {
        expect(created).toBe(true);
        expect(createdObj).toBeInstanceOf(Object);
        done();
      });
  });
});

afterAll((done) => {
  models.score.destroy({ where: {} })
    .then(() => done());
});
