angular
    .module('godhand')
    .controller('FavoriteCtrl', FavoriteCtrl);

FavoriteCtrl.$inject = ['$rootScope', '$scope', '$http'];

function FavoriteCtrl($rootScope, $scope, $http) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "收藏";
    $http.get($rootScope.server + 'favorite/' + $rootScope.user).success(function(data) {
        data.favorites.forEach(function(value, index) {
            data.favorites[index].image_url = $rootScope.server + value.image_url;
            data.favorites[index].authavatar = $rootScope.server + value.authavatar;
        });
        $scope.images = data.favorites;
    });
}