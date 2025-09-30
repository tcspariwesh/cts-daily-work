const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");

const healthCheckController = require("../controllers/health.controller");
const productController = require("../controllers/product.controller");

const sandbox = sinon.createSandbox();

let app = rewire("../app");

xdescribe("Testing express app routes", () => {
  afterEach(() => {
    app = rewire("../app");
    sandbox.restore();
  });

  describe("GET /health", () => {
    beforeEach(() => {
      sandbox.stub(healthCheckController, "healthCheckSync").returns("OK");
      sandbox.stub(healthCheckController, "healthCheckAsync").resolves("OK");
    });

    it("/sync should succeed", (done) => {
      request(app)
        .get("/health/sync")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("health").to.equal("OK");
          done(err);
        });
    });

    it("/async should succeed", (done) => {
      request(app)
        .get("/health/async")
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property("health").to.equal("OK");
          done(err);
        });
    });
  });

  describe("Testing /product route", () => {
    let sampleProductVal, id;

    beforeEach(() => {
      id = "1234567891";
      sampleProductVal = {
        name: "sample product",
        price: 10,
        rating: "5",
      };
      sandbox
        .stub(productController, "fetchProducts")
        .resolves([sampleProductVal]);
      sandbox
        .stub(productController, "fetchProduct")
        .resolves(sampleProductVal);
      sandbox
        .stub(productController, "createProduct")
        .resolves(sampleProductVal);
      sandbox
        .stub(productController, "updateProduct")
        .resolves(sampleProductVal);
    });

    it("GET / should successfully return list of products", (done) => {
      request(app)
        .get(`/product/`)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Products fetch successfully!");
          expect(response.body)
            .to.have.property("products")
            .and.to.be.an.instanceof(Array)
            .and.to.have.property(0)
            .that.includes.all.keys(["name", "price", "rating"]);
          done(err);
        });
    });

    it("GET /:id should successfully return product", (done) => {
      request(app)
        .get(`/product/${id}`)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Product fetch successfully!");
          expect(response.body)
            .to.have.property("product")
            .to.have.property("name")
            .to.equal("sample product");
          expect(response.body)
            .to.have.property("product")
            .to.have.property("price")
            .to.equal(10);
          expect(response.body)
            .to.have.property("product")
            .to.have.property("rating")
            .to.equal("5");
          done(err);
        });
    });

    it("POST / should successfully create a new item", (done) => {
      request(app)
        .post("/product/")
        .send(sampleProductVal)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Product created successfully!");
          expect(response.body)
            .to.have.property("product")
            .to.have.property("name")
            .to.equal("sample product");
          expect(response.body)
            .to.have.property("product")
            .to.have.property("price")
            .to.equal(10);
          expect(response.body)
            .to.have.property("product")
            .to.have.property("rating")
            .to.equal("5");
          done(err);
        });
    });

    it("PUT / should successfully update product for a given id", (done) => {
      request(app)
        .put(`/product/${id}`)
        .send(id)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property("message")
            .to.equal("Product updated successfully!");
          expect(response.body)
            .to.have.property("product")
            .to.have.property("name")
            .to.equal("sample product");
          expect(response.body)
            .to.have.property("product")
            .to.have.property("price")
            .to.equal(10);
          expect(response.body)
            .to.have.property("product")
            .to.have.property("rating")
            .to.equal("5");
          done(err);
        });
    });
  });
});
