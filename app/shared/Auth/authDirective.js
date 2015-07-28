godhand.directive("loginModal", function() {
    return {
        restrict: "E",
        templateUrl: 'app/shared/Auth/login.html'
    }
});

godhand.directive("registerModal", function() {
    return {
        restrict: "E",
        templateUrl: 'app/shared/Auth/register.html'
    }
});