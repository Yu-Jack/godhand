godhandControllers.controller('FollowingCtrl', ['$rootScope','$scope', '$http', '$stateParams', 
    function($rootScope, $scope, $http, $stateParams){
        if( $('.sidebar').hasClass('visible') ){
            $('.left.sidebar').sidebar('toggle');
        }

        $http.get($rootScope.server + 'following/' + $rootScope.user).success(function(data){
            data.followings.forEach(function(value, index){
                data.followings[index].avatar = $rootScope.server + data.followings[index].avatar;
            });
            data.images.forEach(function(value, index){
                data.images[index].authavatar = $rootScope.server + data.images[index].authavatar;
                data.images[index].image_url = $rootScope.server + data.images[index].image_url;
            });
            $scope.people = data.followings;
            $scope.images = data.images;
        });

    }
]);
