godhandControllers.controller('FollowedCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http){
        if( $('.sidebar').hasClass('visible') ){
            $('.left.sidebar').sidebar('toggle');
        }
        $scope.people = [];
        $http.get($rootScope.server + 'followed/' + $rootScope.user).success(function(data){
            data.followeds.forEach(function(value, index){
                value.avatar = $rootScope.server + value.avatar;
            });
            $scope.people = data.followeds;
        });
    }    
]);