angular.module('app').controller('HomeController', function($location, UserService) {

    this.submit = () => {
        
        $('#login-alert').hide().text('');

        UserService.getUserByLogin(this.login).then(function (res) {
            if (res.data.msg) {
                $('#login-alert').text(res.data.msg).show();
                return;
            }
            
            UserService.saveUser(res.data);
            $location.path("/evaluateForm");
        });
    }
});