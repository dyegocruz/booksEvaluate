angular.module('app').controller('BookController', function($scope, $route, $ocLazyLoad, $location, BookService) {
   
    $scope.listBooks = [];

    $scope.init = () => {        
        BookService.getBooksAdmin().then( res => {                       
            $scope.listBooks = res.data;                
        });
    }

    $scope.addForm = () => {
        $location.path('/books/add');
    }

    $scope.registerBook = () => {
        BookService.registerBook($scope.bookAdd).then( res => {
            if (res.data.errors) {
                $scope.listErrors = res.data.errors;                
                return;
            } else {                
                alert(res.data.message);
                $location.path('/books');
            }            
        });
    } 

});