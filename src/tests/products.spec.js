import chai, { should, use } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

should();
use(chaiHttp);
const baseUrl = '/api/v1/';

describe('Product Tests', () => {
  describe('Get all products', () => {
    it('Should successfully get all products', done => {
      chai
        .request(app)
        .get(`${baseUrl}products`)
        .end((err, res) => {
          const { status, data } = res.body;
          status.should.equal(200);
          data.should.be.a('array');
          data.forEach(datum => {
            datum.should.have.property('id');
            datum.should.have.property('name');
            datum.should.have.property('price');
          });
          done();
        });
    });
  });

  describe('Get a specific product', () => {
    it('Should get the product successfully', done => {
      const id = 1;
      chai
        .request(app)
        .get(`${baseUrl}products/${id}`)
        .end((err, res) => {
          const { status, data } = res.body;
          status.should.equal(200);
          data.should.be.a('object');
          data.should.have.property('id');
          data.should.have.property('name');
          data.should.have.property('description');
          data.should.have.property('price');
          data.should.have.property('category');
          data.should.have.property('color');
          data.should.have.property('image');
          done();
        });
    });

    it('Should respond with a 404 error for a product that does not exist', done => {
      const id = 198766;
      chai
        .request(app)
        .get(`${baseUrl}products/${id}`)
        .end((err, res) => {
          const { status, error } = res.body;
          status.should.equal(404);
          error.should.equal(`Product with id: ${id} not found`);
          done();
        });
    });
  });

  describe('Create a product', () => {
    it('Should create the product successfully', done => {
      chai
        .request(app)
        .post(`${baseUrl}products`)
        .send({
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: faker.commerce.price(),
          category: faker.commerce.productName(),
          image: faker.image.imageUrl(),
          color: faker.commerce.color(),
        })
        .end((err, res) => {
          const { status, data } = res.body;
          status.should.equal(201);
          data.should.be.a('object');
          data.should.have.property('id');
          data.should.have.property('name');
          data.should.have.property('description');
          data.should.have.property('price');
          data.should.have.property('category');
          data.should.have.property('color');
          data.should.have.property('image');
          done();
        });
    });
  });
});
