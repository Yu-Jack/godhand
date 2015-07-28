godhandControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$state', '$http', '$cookies',
    function($rootScope, $scope, $state, $http, $cookies) {
        $scope.submit = function() {
            // $rootScope.logged = true;
            // $('.ui.modal.login').modal('hide');
            // $state.go('home', {}, {reload:true});
            // 
            var req = {
                method: 'POST',
                url: $rootScope.server  + 'login',
                data: $.param({email: $scope.email, password: $scope.password})
            };

            $http(req).success(function(data, status, headers, config) {
            		if( data.logged ){
            			$rootScope.logged = data.logged;
                        $rootScope.user = data.user_id;
                        $cookies.put('user',data.user_id);
                        $cookies.put('logged',data.logged);
            			$('.ui.modal.login').modal('hide');
            			$state.go('home',{},{reload:true});
            		}else{
            			$scope.errorwithlogin = '帳號密碼錯誤';
            		}
                }).error(function(data, status, headers, config) {
                    console.log('error');
                });
        };
    }
]);
