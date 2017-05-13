angular.module('app').controller('UserController', function($scope, $route, $ocLazyLoad, $location, UserService) {
   
    $scope.listUsers = [];
    $scope.listErrors = null;

    $scope.init = () => {
        UserService.getUsers().then( res => {                       
            $scope.listUsers = res.data;                
        });
    }

    $scope.addForm = () => {
        $location.path('/users/add');
    }

    $scope.registerUser = () => {
        UserService.registerUser($scope.usr).then( res => {            
            if (res.data.errors) {
                $scope.listErrors = res.data.errors;                
                return;
            } else {                
                alert(res.data.message);
                $location.path('/users');
            }            
        });
    }    

});