const request = require('supertest');
const app = require('../../src/app');
const { connect } = require('../../src/db');
const { getConfig } = require('../../src/config');
const { createCar, createCategory } = require('../utils');

describe('GET /admin', () => {
  beforeEach(async () => {
    await connect();
  });

  it('should return 200 for admin endpoint with basic authentication', async () => {
    const { adminUser, adminPassword } = getConfig();

    const res = await request(app).get('/admin').auth(adminUser, adminPassword);
    expect(res.statusCode).toBe(200);
  });

  it('should return 401 for admin endpoint without basic authentication', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(401);
  });
});

describe('POST /admin/:id', () => {
  beforeEach(async () => {
    await connect();
  });

  it('should update car with correct authentication', async () => {
    const { adminUser, adminPassword } = getConfig();

    const category = await createCategory();
    const car = await createCar();

    const updatedCarData = {
      name: 'Updated Name',
      description: 'Updated Description',
      price: 25000,
      color: 'Blue',
      categories: category._id.toString(),
    };

    const res = await request(app)
      .post(`/admin/${car._id}`)
      .auth(adminUser, adminPassword)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(updatedCarData);

    expect(res.statusCode).toBe(302);
  });

  it('should return 401 for unauthorized request', async () => {
    const car = await createCar();
    const res = await request(app).post(`/admin/${car._id}`).send({});
    expect(res.statusCode).toBe(401);
  });

  it('should return 400 for invalid data', async () => {
    const { adminUser, adminPassword } = getConfig();
    const car = await createCar();
    const invalidCarData = {
      price: 'not a number',
    };

    const res = await request(app)
      .post(`/admin/${car._id}`)
      .auth(adminUser, adminPassword)
      .send(invalidCarData);

    expect(res.statusCode).toBe(400);
  });
});
