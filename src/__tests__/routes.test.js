const request = require('supertest');
const app = require('../server');

describe('History Api Endpoints', () => {
  it('should get user data', async () => {
    const res = await request(app).get('/api/all');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('message');
  });
});

describe('CountriesApi Endpoints', () => {
  it('should get list of countries', async () => {
    const res = await request(app).get('/api/countries');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});

describe('api Endpoints', () => {
  it('should get api works', async () => {
    const res = await request(app).get('/api');

    expect(res.body).toEqual({ message: 'api works' });
  });
});
