const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Cat } = require('../src/models');

describe('/cats', () => {
  before((done) => {
    Cat.sequelize.sync().then(() => done());
  });

  afterEach((done) => {
    Cat.destroy({ where: {} })
      .then(() => done());
  });

  describe('with no records in the database', () => {
    describe('POST', () => {
      it('creates a new cat in the database', (done) => {
        const catData = {
          name: 'Boris',
          breed: 'domestic shorthair',
          markings: 'tuxedo',
        };

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
          .then((catDocument) => {
            expect(catDocument.name).to.equal(catData.name);
            expect(catDocument.breed).to.equal(catData.breed);
            expect(catDocument.markings).to.equal(catData.markings);
            done();
          })
          .catch((error) => done(error));
      });
    });
  });

  describe('with records in the database', () => {
    let cats;

    beforeEach((done) => {
      Promise.all([
        Cat.create({
          name: 'Jenny Any Dots',
          breed: 'domestic shorthair',
          markings: 'ginger tabby',
        }),
        Cat.create({
          name: 'Bustopher Jones',
          breed: 'domestic shorthair',
          markings: 'tuxedo',
        }),
        Cat.create({
          name: 'Gus',
          breed: 'domestic shorthair',
          markings: 'grey tabby',
        }),
      ])
        .then((documents) => {
          cats = documents;
          done();
        });
    });

    describe('GET', () => {
      it('returns all records in the database', (done) => {
        request(app)
          .get('/cats')
          .send()
          .then(({ status, body }) => {
            expect(status).to.equal(200);
            expect(body.cats.length).to.equal(cats.length);
            body.cats.forEach((cat) => {
              const expected = cats.find((c) => c.id === cat.id).dataValues;
              expect(cat.name).to.deep.equal(expected.name);
              expect(cat.breed).to.deep.equal(expected.breed);
              expect(cat.markings).to.deep.equal(expected.markings);
            });
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe('/cats/{catId}', () => {
      describe('GET', () => {
        it('returns the correct cat record', (done) => {
          const catData = cats[0].dataValues;
          request(app)
            .get(`/cats/${catData.id}`)
            .send()
            .then(({ status, body }) => {
              expect(status).to.equal(200);
              expect(body.name).to.equal(catData.name);
              expect(body.breed).to.equal(catData.breed);
              expect(body.markings).to.equal(catData.markings);

              done();
            })
            .catch((error) => done(error));
        });
      });

      describe('PATCH', () => {
        it('updates a cat in the database', (done) => {
          const catData = cats[0].dataValues;
          request(app)
            .patch(`/cats/${catData.id}`)
            .send({
              name: 'new name',
            })
            .then(({ status, body }) => {
              expect(status).to.equal(200);
              expect(body.catsUpdated).to.equal(1);

              return Cat.findByPk(catData.id, { raw: true });
            })
            .then((catDocument) => {
              expect(catDocument.name).to.equal('new name');

              done();
            })
            .catch((error) => done(error));
        });
      });

      describe('DELETE', () => {
        it('deletes the cat from the database', (done) => {
          const catData = cats[0].dataValues;
          request(app)
            .delete(`/cats/${catData.id}`)
            .send()
            .then(({ status, body }) => {
              expect(status).to.equal(200);
              expect(body.catsDeleted).to.equal(1);

              done();
            })
            .catch((error) => done(error));
        });
      });
    });
  });
});
