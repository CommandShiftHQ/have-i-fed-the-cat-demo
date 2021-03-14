const app = require('../src/app');
const { expect } = require('chai');
const request = require('supertest');
const { Cat } = require('../src/models');

describe('/cats', () => {
  before((done) => {
    Cat.sequelize.sync().then(() => done());
  })

  describe('POST', () => {
    it('creates a new cat in the database', (done) => {
      request(app)
        .post('/cats')
        .send({
          name: 'Boris',
          breed: 'domestic shorthair',
          markings: 'tuxedo'
        })
        .then(response => {
          expect(response.status).to.equal(201);
          done();
        })
        .catch(error => done(error));
    });
  });
});
