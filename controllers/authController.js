app.controller('AuthController', ['$scope', '$location', '$timeout', 'authService', function($scope, $location, $timeout, authService) {
    
    // Redirect if already logged in
    if (authService.isLoggedIn()) {
        $location.path('/feed');
        return;
    }

    $scope.credentials = { email: '', password: '' };
    $scope.newUser = { name: '', email: '', password: '' };
    $scope.errorMessage = '';

    $scope.login = function() {
        let res = authService.login($scope.credentials.email, $scope.credentials.password);
        if (res.success) {
            $location.path('/feed');
        } else {
            $scope.errorMessage = res.message;
            $timeout(() => $scope.errorMessage = '', 3000);
        }
    };

    $scope.register = function() {
        let res = authService.register($scope.newUser.name, $scope.newUser.email, $scope.newUser.password);
        if (res.success) {
            // Auto login after register
            authService.login($scope.newUser.email, $scope.newUser.password);
            $location.path('/feed');
        } else {
            $scope.errorMessage = res.message;
            $timeout(() => $scope.errorMessage = '', 3000);
        }
    };
}]);
