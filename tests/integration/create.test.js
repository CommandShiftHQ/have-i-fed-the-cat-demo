const sinon = require('sinon');
const { create } = require('../../src/controllers/cats')
const catRepository = require('../../src/repository/cats');

describe('create', () => {
  afterEach(() => {
    sinon.restore()
  })

  // spy
  it('it uses the catRepository to create a new cat', () => {
    const req = {
      body: {}
    }
    const res = {
      status: () => { json: () => {} }
    }
    const createCatSpy = sinon.spy(catRepository, "createCat")

    create(req, res)

    sinon.assert.calledOnce(createCatSpy)
  })
})