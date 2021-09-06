const sinon = require('sinon');
const { create } = require('../../src/controllers/cats')
const catRepository = require('../../src/repository/cats');

describe('create', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        name: "Boris",
        breed: "domestic shorthair",
        markings: "tuxedo"
      }
    }

    res = { status: () => { json: () => {} } }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('spy', () => {
    const createCatSpy = sinon.spy(catRepository, "createCat")

    create(req, res)

    sinon.assert.calledOnce(createCatSpy)
  })

  it('stub', () => {
    const createCatStub = sinon.stub(catRepository, "createCat").callsFake(data => Promise.resolve(data))

    create(req, res)

    sinon.assert.calledWith(createCatStub, req.body)
  })
 
    it("mock", () => {
      const mockCatRepository = sinon.mock(catRepository)
      mockCatRepository.expects("createCat")
        .once()
        .withArgs(req.body)
        .returns(Promise.resolve(req.body))
  
      create(req,res)
  
      mockCatRepository.verify()
    })
})