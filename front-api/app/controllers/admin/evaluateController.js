angular.module('app').controller('EvaluateController', function($scope, $route, $ocLazyLoad, $location, UserService, EvaluateService) {
   
    $scope.listEvaluates = [];

   $scope.init = () => {

        EvaluateService.getEvaluates().then( res => {    
            $scope.listEvaluates = res.data;       
        });                
   }

});