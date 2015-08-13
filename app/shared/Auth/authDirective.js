angular
    .module('godhand')
    .directive("loginModal", loginModal)
    .directive("registerModal", registerModal);

function loginModal(){
    return {
            restrict: "E",
            templateUrl: 'app/shared/Auth/login.html',
            controller: 'LoginCtrl'
        }
}
function registerModal() {
    return {
        restrict: "E",
        templateUrl: 'app/shared/Auth/register.html',
        controller: 'RegisterCtrl'
    }
}
