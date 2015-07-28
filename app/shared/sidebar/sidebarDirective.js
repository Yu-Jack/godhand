godhand.directive("sideBar", function ($rootScope, $state, $cookies) {
    return {
        restrict: "E",
        templateUrl: 'app/shared/sidebar/sidebar.html',
        controller: function($scope){
            $scope.logged = $rootScope.logged;
            $scope.user = $rootScope.user;
            $scope.login = function(){
                $('.ui.modal.login').modal('show');
            }
            $scope.register = function(){
                $('.ui.modal.register').modal('show');   
            }
            $scope.logout = function(){
                $rootScope.logged = false;
                $rootScope.user = 0;
                $cookies.remove('user');
                $cookies.remove('logged');
                $state.go('home',{},{reload:true});
            }
        },
        link: function($scope, $elements, $attrs){
        }
    }
});