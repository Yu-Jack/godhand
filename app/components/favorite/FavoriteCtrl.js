godhandControllers.controller('FavoriteCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http){
        if( $('.sidebar').hasClass('visible') ){
            $('.left.sidebar').sidebar('toggle');
        }

        $http.get($rootScope.server + 'favorite/' + $rootScope.user).success(function(data){
            data.favorites.forEach(function(value, index){
                data.favorites[index].image_url = $rootScope.server + value.image_url;
                data.favorites[index].authavatar = $rootScope.server + value.authavatar;
            });
            $scope.images = data.favorites;
            // $scope.poeple = data.followeds;
            // data.followeds.forEach(function(value, index){
            //     $scope.people.push({avatar:$rootScope.server + value.avatar, name:value.name});
            // });
        });

    }
]);

godhandControllers.controller('MenuCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.menu = function(){
            $('.left.sidebar').sidebar('toggle');
        }
    }
]);
