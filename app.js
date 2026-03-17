const app = angular.module('luminaBlog', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/feed', {
            templateUrl: 'views/feed.html',
            controller: 'BlogController'
        })
        .when('/viewer/:id', {
            templateUrl: 'views/post-viewer.html',
            controller: 'BlogController'
        })
        .when('/creator', {
            templateUrl: 'views/creator.html',
            controller: 'BlogController',
            resolve: {
                auth: ['authService', '$location', function(authService, $location) {
                    if (!authService.isLoggedIn()) {
                        $location.path('/login');
                        return false;
                    }
                    return true;
                }]
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthController'
        })
        .otherwise({
            redirectTo: '/feed'
        });
}]);

// Global app controller to handle active nav states and logout
app.controller('MainController', ['$scope', '$location', 'authService', function($scope, $location, authService) {
    $scope.isActive = function(viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.isLoggedIn = function() {
        return authService.isLoggedIn();
    };

    $scope.getCurrentUser = function() {
        return authService.getCurrentUser();
    };

    $scope.logout = function() {
        authService.logout();
        $location.path('/feed');
    };
}]);

// Custom filter to truncate text
app.filter('truncate', function() {
    return function(text, length) {
        if (!text) return '';
        if (text.length <= length) return text;
        return text.substring(0, length).trim() + '...';
    };
});
