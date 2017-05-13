angular.module('app').controller('DashboardController', function($scope, $location, UserService) {

    $scope.init = () => {
        if (!UserService.getUserToken()) {
            $location.path('/login');
        }
    }

});