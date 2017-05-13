angular.module('app').controller('DashboardController', function($scope, $rootScope, $location, UserService) {

    $scope.init = () => {
        //UserService.removeUser();
        if (!UserService.isAuthenticaded()) {
            $location.path('/login');
        }

        
    }

});