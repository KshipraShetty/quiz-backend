const models = require('../../models');


beforeEach((done) => {
  models.user.destroy({ where: {} })
    .then(() => done());
});


describe('Check for user model if the user is present or not', () => {
  test('Should return true and an object', (done) => {
    models.user.presentOrNot('aaaa')
      .spread((createdObj, created) => {
        expect(created).toBe(true);
        expect(createdObj).toBeInstanceOf(Object);
        done();
      });
  });
});

afterAll((done) => {
  models.user.destroy({ where: {} })
    .then(() => done());
});
