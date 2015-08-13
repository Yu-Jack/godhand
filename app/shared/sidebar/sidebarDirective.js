angular
    .module('godhand')
    .controller('SideBarCtrl', SideBarCtrl)
    .directive("sideBar", sideBar);



SideBarCtrl.$inject = ['$rootScope', '$scope', '$state', '$cookies'];
function SideBarCtrl($rootScope, $scope, $state, $cookies) {
    $scope.logged = $rootScope.logged;
    $scope.user = $rootScope.user;
    $scope.login = function() {
        $('.ui.modal.login').modal('show');
    }
    $scope.register = function() {
        $('.ui.modal.register').modal('show');
    }
    $scope.logout = function() {
        $rootScope.logged = false;
        $rootScope.user = 0;
        $cookies.remove('user');
        $cookies.remove('logged');
        alert("登出成功！");
        $state.go('home', {}, {
            reload: true
        });
    }
}

function sideBar() {
    return {
        restrict: "E",
        templateUrl: 'app/shared/sidebar/sidebar.html',
        controller: 'SideBarCtrl'
    }
}