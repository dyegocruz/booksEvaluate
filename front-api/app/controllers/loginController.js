angular.module('app').controller('LoginController', function($scope, $route, $rootScope, $location, UserService) {    

    $scope.init = () => {        
        if (UserService.isAuthenticaded()) {
            $location.path('/dashboard');
        }
    }

    $scope.submit = () => {
        $('#login-alert').text('').hide();
        
        UserService.loginUser($scope.login, $scope.password).then((res) => {
            console.log(res);     
            if (res.data.msg) {
                $('#login-alert').text(res.data.msg).show();
                return;
            }
            
            UserService.saveUserAndToken(res.data);
            $location.path('/dashboard');
            window.location.reload();
        });
    }
});