import request from 'supertest';
import app from '../app/server';

describe('Server is working', () => {
  
  it('GET /v1 should respond with json', (done) => {
    request(app)
      .get('/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});