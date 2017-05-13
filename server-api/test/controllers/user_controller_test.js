import request from 'supertest';
import app from '../../app/server';

describe('UserController', () => {
 describe('router /v1/users', () => {
   it('GET /api/users should online', (done) => {
     request(app)
       .get('/v1/users')
       .set('Accept', 'application/json')
       .expect('Content-Type', /json/)
       .expect(200, done);
   });

   it('GET /v1/users should be json of users', (done) => {
     request(app)
       .get('/v1/users')
       .set('Accept', 'applica')
       .expect(hasUserJson)
       .end(done);     
   });
   
   function hasUserJson(res) {    
     if(!('users' in res.body)) { 
       throw new Error('missing users key');
     }
   }

 });

});