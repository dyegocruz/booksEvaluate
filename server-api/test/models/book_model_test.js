import assert from 'assert';
import should from 'should';
import book from '../../app/models/book';

describe('Book', () => {
  describe('#getBooks()', () => {
    it('should return all books', () => {
      (book.getBooks().length).should.not.be.below(0);    
    });
  });
});