// tests/members.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Members API', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should fetch all members', async () => {
    const res = await request(app).get("/members");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new member', async () => {
    const newMember = {
      code: "M001",
      name: "Angga"
    };

    const res = await request(app)
      .post('/members')
      .send(newMember);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Member added successfully');
  });
});
