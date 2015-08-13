angular
    .module('godhand')
    .service('AuthService', AuthService);

AuthService.$inject = ['$rootScope', '$http'];

function AuthService($rootScope, $http) {
    var self = this;
    self.login = function(email, pwd) {
        var req = {
            method: 'POST',
            url: $rootScope.server + 'login',
            data: $.param({
                email: email,
                password: pwd
            })
        };
        return $http(req);
    }

    self.register = function(name, email, password) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'register',
            data: $.param({
                name: name,
                email: email,
                password: password
            })
        };
        return $http(req);
    }
}
