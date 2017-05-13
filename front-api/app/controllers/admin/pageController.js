angular.module('app').controller('PageController', function($scope, $window, $route, $ocLazyLoad, $location, UserService) {
   
    $scope.init = () => {
        $scope.isAuthenticated = UserService.isAuthenticaded();
        $scope.user = UserService.getUserStore();       
    }

    $scope.isActive = (url) => {
        if ($location.path() === url) {
            return 'active';
        }
    }

    $scope.showMenu = () => {   
        return ($scope.isAuthenticated && $location.path() != '/' && $location.path() != '/evaluateForm');
    }

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    $scope.logout = () => {
        UserService.logoutUser();       
    }

});