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
      const catData = {
        name: 'Boris',
        breed: 'domestic shorthair',
        markings: 'tuxedo'
      }

      request(app)
        .post('/cats')
        .send(catData)
        .then(({ status, body }) => {
          expect(status).to.equal(201);

          expect(body.name).to.equal(catData.name);
          expect(body.breed).to.equal(catData.breed);
          expect(body.markings).to.equal(catData.markings);
          
          return Cat.findByPk(body.id, { raw: true });
        })
        .then(catDocument => {
          expect(catDocument.name).to.equal(catData.name);
          expect(catDocument.breed).to.equal(catData.breed);
          expect(catDocument.markings).to.equal(catData.markings);
          done();
        })
        .catch(error => done(error));
    });
  });
});
