const app = angular.module('app',[ 'pascalprecht.translate', 'ngRoute', 'oc.lazyLoad', 'angularUtils.directives.dirPagination']);

app.constant('urls', {
    BASE: 'http://localhost:3000',
    BASE_API: 'http://localhost:3001/v1'
});

app.config(['$routeProvider', ($routeProvider, $ocLazyLoadProvider) => {
  $routeProvider
  .when('/', {		
        templateUrl: '/app/views/home.html',
        controller: 'HomeController as home',
        resolve: {
        	HomeController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/homeController.js',
                    'app/services/userService.js']); }]
       		 
        }
    })
    .when('/evaluateForm', {		
        templateUrl: '/app/views/evaluateForm.html',
        controller: 'EvaluateController as evaluate',
        resolve: {
        	EvaluateController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/evaluateController.js', 
                   'app/services/evaluateService.js',
                   'app/services/bookService.js',
                   'app/services/userService.js']); }]
        }
    })
    .when('/dashboard', {		
        templateUrl: '/app/views/admin/dashboard.html',
        controller: 'DashboardController as dashboard',
        requiresAuthentication: true,
        resolve: {
        	DashboardController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/admin/dashboardController.js',                   
                   'app/services/userService.js']); }]
        }
    })
    .when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginController',
        resolve: {
        	LoginController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/loginController.js',
                   'app/services/userService.js']); }]
        }
    })
    .when('/evaluates', {
        templateUrl: '/app/views/admin/evaluates/index.html',
        controller: 'EvaluateController as evaluates',
        resolve: {
        	EvaluateController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/admin/evaluateController.js',
                   'app/services/userService.js',
                   'app/services/evaluateService.js']); }]
        }
    })
    .when('/books', {
        templateUrl: '/app/views/admin/books/index.html',
        controller: 'BookController as books',
        resolve: {
        	BookController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/admin/bookController.js',
                   'app/services/userService.js',
                   'app/services/bookService.js']); }]
        }
    })
    .when('/books/add', {
        templateUrl: '/app/views/admin/books/add.html',
        controller: 'BookController as bookAdd',
        resolve: {
        	BookController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/admin/bookController.js',                   
                   'app/services/bookService.js']); }]
        }
    })
    .when('/users', {
        templateUrl: '/app/views/admin/users/index.html',
        controller: 'UserController as users',
        resolve: {
        	UserController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/admin/userController.js',
                   'app/services/userService.js']); }]
        }
    })
    .when('/users/add', {
        templateUrl: '/app/views/admin/users/add.html',
        controller: 'UserController as userAdd',
        resolve: {
        	UserController: 
       		 ['$ocLazyLoad', function($ocLazyLoad) {
       			return $ocLazyLoad.load(['app/controllers/admin/userController.js',
                   'app/services/userService.js']); }]
        }
    }).otherwise({ redirectTo: '/' });
}]);

app.config(['$httpProvider', ($httpProvider, $ocLazyLoadProvider) => {

    $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (window.localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + window.localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                    window.location.reload();
                }
                return $q.reject(response);
            }
        };
    }]);
}]);

app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    PROJECT: 'Books Evaluate App',
    TITLE_HOME: 'Home',
    TITLE_USER: 'Check User to Evaluate',
    TITLE_RESTAURANT: 'Restaurants',
    COPY: '© copy 2017 BooksEvaluate.'
  });
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.preferredLanguage('en');
});