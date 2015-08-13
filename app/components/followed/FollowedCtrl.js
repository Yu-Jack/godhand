angular
    .module('godhand')
    .controller('FollowedCtrl', FollowedCtrl);

FollowedCtrl.$inject = ['$rootScope', '$scope', '$http'];

function FollowedCtrl($rootScope, $scope, $http) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "追蹤你的人";
    $scope.people = [];
    $http.get($rootScope.server + 'followed/' + $rootScope.user).success(function(data) {
        data.followeds.forEach(function(value, index) {
            value.avatar = $rootScope.server + value.avatar;
        });
        $scope.people = data.followeds;
    });
}
