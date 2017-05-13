angular.module('app').controller('EvaluateController', function($scope, $route, $ocLazyLoad, $location, UserService, BookService, EvaluateService) {
    $scope.listBooks = [];
    $scope.user = UserService.getUserStore();

    $scope.init = () => {            
    
        if (!$scope.user) {
            $location.path("/");
            return;
        }

        $scope.userName = $scope.user.name;
        $scope.countCharcters();
        BookService.getBooks().then( res => {
            $scope.listBooks = res.data;
        });

        $('#btn-register-evaluate').click(() => {
            $("#modalConfirmation").modal('hide');
        });

        $('#btn-logout').click(() => {     
            UserService.removeUserSession();
            $location.path("/");
            $route.reload();            
        });
    }

    $scope.registerEvaluate = () => {

        // reset alert messages
        $scope.listErrors = null;

        if ($scope.user) {
            $scope.evaluate.user = $scope.user._id;            
            EvaluateService.registerEvaluate($scope.evaluate).then( res => {
                if (res.data.errors) {
                    $scope.listErrors = res.data.errors;
                    return;    
                }                
                $scope.evaluate = {};                

                $("#modalConfirmation").modal('show');

            });
        }
    }

    $scope.countCharcters = () => {
        var text_max = 256;
        $('#count_description').html(text_max + ' remaining');

        $('#description').keyup(() => {
            var text_length = $('#description').val().length;
            var text_remaining = text_max - text_length;
        
            $('#count_description').html(text_remaining + ' remaining');
        });
    }


});