const chai = require("chai");
const expect = chai.expect;

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const mongoose = require("mongoose");

const sandbox = sinon.createSandbox();

let productController = rewire("../controllers/product.controller");

describe("Testing /product endpoint", () => {//test suite
  let sampleProductVal;
  let findStub;
  let findOneStub;
  let updateOneStub;

  beforeEach(() => {
    sampleProductVal = {
      name: "sample product",
      price: 10,
      rating: "5",
    };

    findStub = sandbox
      .stub(mongoose.Model, "find")
      .resolves([sampleProductVal]);
    findOneStub = sandbox
      .stub(mongoose.Model, "findOne")
      .resolves([sampleProductVal]);

    updateOneStub = sandbox
      .stub(mongoose.Model, "updateOne")
      .resolves(sampleProductVal);
  });

  afterEach(() => {
    productController = rewire("../controllers/product.controller");
    sandbox.restore();
  });

  describe("GET /", () => {//test case
    it("should succeed for all products", async () => {
      productController
        .fetchProducts()
        .then((products) => {
          expect(products).to.equal([sampleProductVal]);
        })
        .catch((err) => {
          throw new Error("Unexpected failure!");
        });
    });
  });

  describe("GET /:id", () => {
    it("should return error when called without id", async () => {
      productController
        .fetchProduct()
        .then(() => {
          throw new Error("Unexpected success!");
        })
        .catch((err) => {
          expect(result).to.be.instanceOf(Error);
          expect(err.message).to.equal("Invalid product id");
        });
    });

    it("should return product when called with id", async () => {
      productController
        .fetchProduct("someRandomId")
        .then((product) => {
          expect(product).to.equal(sampleProductVal);
        })
        .catch((err) => {
          throw new Error("Unexpected failure!");
        });
    });
  });

  describe("PUT /:id", () => {
    it("should return error when tried to update without id", async () => {
        productController
          .updateProduct()
          .then(() => {
            throw new Error("Unexpected success!");
          })
          .catch((err) => {
            expect(result).to.be.instanceOf(Error);
            expect(err.message).to.equal("Incomplete arguments");
          });
      });

      
    it("should be updated when called with id", async () => {
      productController
        .updateProduct("someRandomId", sampleProductVal)
        .then((product) => {
          expect(product).to.equal(sampleProductVal);
        })
        .catch((err) => {
          throw new Error("Unexpected failure!");
        });
    });
  });

  describe("POST /", () => {
    let productModelStub, saveStub, result;

    beforeEach(async () => {
      saveStub = sandbox.stub().returns(sampleProductVal);
      productModelStub = sandbox.stub().returns({
        save: saveStub
      });

      productController.__set__('Product', productModelStub);
    });

    it('should throw invalid argument error', () => {
      productController.createProduct()
        .then(() => {
          throw new Error('⚠️ Unexpected success!');
        })
        .catch(err => {
          expect(result).to.be.instanceOf(Error);
          expect(err.message).to.equal('Invalid arguments');
        })
    });

    it('should create product successfully', async () => {
      result = await productController.createProduct(sampleProductVal);
      expect(productModelStub).to.have.been.calledWithNew;
      expect(productModelStub).to.have.been.calledWith(sampleProductVal);
      expect(saveStub).to.have.been.called;
      expect(result).to.equal(sampleProductVal);
    });
  });
});
