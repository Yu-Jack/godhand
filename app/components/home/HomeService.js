angular
    .module('godhand')
    .service('HomeService', HomeService)
    .service('LikeService', LikeService);

HomeService.$inject = ['$rootScope', '$http', '$cookies'];

function HomeService($rootScope, $http, $cookies) {
    var self = this;
    self.getData = function() {
        var request = {
            method: 'post',
            url: $rootScope.server + 'image',
            data: $.param({
                user_id: $rootScope.user
            })
        };
        var result = [];
        $http(request).success(function(data) {
            var order = [];
            data.images.forEach(function(value, index) {
                order.push(value.id);
                result.push({
                    id: value.id,
                    authId: value.authId,
                    imageurl: $rootScope.server + value.image_url,
                    auth: value.auth,
                    authavatar: $rootScope.server + value.authavatar,
                    comments: value.count_comments,
                    views: parseInt(value.count_views),
                    favorite: value.count_favorite,
                    isLiked: value.isLiked
                });
            });
            $cookies.put('order', order);
        });
        return result;
    }
}

LikeService.$inject = ['$rootScope', '$http'];

function LikeService($rootScope, $http) {
    var self = this;
    self.like = function(id) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'like',
            data: $.param({
                user_id: $rootScope.user,
                image_id: id
            })
        }
        return $http(req);
    }
}
