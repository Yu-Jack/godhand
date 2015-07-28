godhandControllers.controller('FollowedCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http){
        if( $('.sidebar').hasClass('visible') ){
            $('.left.sidebar').sidebar('toggle');
        }
        $scope.people = [];
        $http.get($rootScope.server + 'followed/' + $rootScope.user).success(function(data){
            $scope.poeple = data.followeds;
            data.followeds.forEach(function(value, index){
                $scope.people.push({avatar:$rootScope.server + value.avatar, name:value.name});
            });
        });
    }    
]);