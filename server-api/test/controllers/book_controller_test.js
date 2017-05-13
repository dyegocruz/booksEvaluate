import request from 'supertest';
import app from '../../app/server';

describe('BookController service all Books', () => {
  
  it('GET /v1/books', (done) => {
    request(app)
      .get('/v1/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  
  it('GET /v1/books should be a json of Books', (done) => {
    request(app)
      .get('/v1/books')
      .set('Accept', 'application/json')
      .expect(hasBooksJson)
      .end(done);
  });

  function hasBooksJson(res) {    
     if(!('books' in res.body)) { 
       throw new Error('missing Books key');
     }
   }

});