godhand.directive("loginModal", function() {
    return {
        restrict: "E",
        templateUrl: 'app/shared/Auth/login.html',
        controller: 'LoginCtrl'
    }
});

godhand.directive("registerModal", function() {
    return {
        restrict: "E",
        templateUrl: 'app/shared/Auth/register.html',
        controller: 'RegisterCtrl'
    }
});