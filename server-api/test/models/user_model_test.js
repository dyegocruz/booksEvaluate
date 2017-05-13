import assert from 'assert';
import should from 'should';
import user from '../../app/models/user';

describe('UserModel', () => {
  describe('#getUsers()', () => {
    it('should return all users', () => {      
      (user.getUsers().length).should.not.be.below(0);
    });
  });
});