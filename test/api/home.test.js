const request = require('supertest');
const app = require('../../src/app');
const { createCategory, createCar } = require('../utils');
const { connect } = require('../../src/db');

describe('GET /', () => {
  beforeEach(async () => {
    await connect();
  });

  it('should return a category by valid id', async () => {
    const category = await createCategory();

    const car = await createCar({ categories: [category._id] });

    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('text/html; charset=utf-8');

    expect(res.text).toContain(category.name);
    expect(res.text).toContain(car.name);
  });
});
