godhandControllers.controller('FollowingCtrl', ['$rootScope','$scope', '$http', '$stateParams', 
    function($rootScope, $scope, $http, $stateParams){
        if( $('.sidebar').hasClass('visible') ){
            $('.left.sidebar').sidebar('toggle');
        }
        $rootScope.pagetitle = "追蹤";
        $http.get($rootScope.server + 'following/' + $rootScope.user).success(function(data){
            data.followings.forEach(function(value, index){
                value.avatar = $rootScope.server + value.avatar;
            });
            data.images.forEach(function(value, index){
                value.authavatar = $rootScope.server + value.authavatar;
                value.image_url = $rootScope.server + value.image_url;
            });
            $scope.people = data.followings;
            $scope.images = data.images;
        });

    }
]);
