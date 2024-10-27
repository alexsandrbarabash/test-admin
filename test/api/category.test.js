const request = require('supertest');
const app = require('../../src/app');
const { createCategory, createCar } = require('../utils');
const { connect } = require('../../src/db');
const ObjectId = require('mongoose').Types.ObjectId;

describe('GET /category/:id', () => {
  beforeEach(async () => {
    await connect();
  });

  it('should return a category by valid id', async () => {
    const category = await createCategory();

    const car = await createCar({ categories: [category._id] });

    const res = await request(app).get(`/category/${category._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
    expect(res.text).toContain(category.name);
    expect(res.text).toContain(car.name);
  });

  it('should return 400 if id is invalid', async () => {
    const res = await request(app).get(`/category/some-invalid-id`);

    expect(res.statusCode).toBe(400);
  });

  it('should return 404 if category does not exist', async () => {
    const res = await request(app).get(`/category/${new ObjectId()}`);

    expect(res.statusCode).toBe(404);
  });
});
