app.service('BookService', function($q, $http, $location) {
  
    const BookService = {
    
        registerBook: bookForm => {
            let book = $http.post('http://localhost:3001/v1/books/add', bookForm);
            return book;
        },

        getBooks: () => {        
            let books = $http.get('http://localhost:3001/v1/books');
            return books;
        },

        getBooksAdmin: () => {        
            let books = $http.get('http://localhost:3001/v1/booksAdmin');
            return books;
        }
    };

    return BookService;
});