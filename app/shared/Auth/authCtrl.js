godhandControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$state', '$http', '$cookies',
    function($rootScope, $scope, $state, $http, $cookies) {
        $scope.submit = function() {
            // $rootScope.logged = true;
            // $('.ui.modal.login').modal('hide');
            // $state.go('home', {}, {reload:true});
            // 
            var req = {
                method: 'POST',
                url: $rootScope.server + 'login',
                data: $.param({
                    email: $scope.email,
                    password: $scope.password
                })
            };

            $http(req).success(function(data, status, headers, config) {
                if (data.logged) {
                    $rootScope.logged = data.logged;
                    $rootScope.user = data.user_id;
                    $cookies.put('user', data.user_id);
                    $cookies.put('logged', data.logged);
                    $('.ui.modal.login').modal('hide');
                    alert("登入成功！");
                    $state.go('home', {}, {
                        reload: true
                    });
                } else {
                    $scope.errorwithlogin = '帳號密碼錯誤';
                }
            }).error(function(data, status, headers, config) {
                console.log('error');
            });
        };
    }
]);
godhandControllers.controller('RegisterCtrl', ['$rootScope', '$scope', '$state', '$http', '$cookies',
    function($rootScope, $scope, $state, $http, $cookies) {
        $('.ui.form.register').form({
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your name'
                    }]
                },
                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'length[6]',
                        prompt: 'The password must be longer than six characters'
                    }]
                },
                email: {
                    identifier: 'email',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your email'
                    }, {
                        type: 'email',
                        prompt: 'Please enter correct email formate'
                    }]
                }
            },
            onSuccess: function() {
                var req = {
                    method: 'post',
                    url: $rootScope.server + 'register',
                    data: $.param({
                        name: $scope.name,
                        email: $scope.email,
                        password: $scope.password
                    })
                };
                $http(req).success(function(data) {
                    if (data.success) {
                        // alert('tes');
                        $rootScope.logged = true;
                        $rootScope.user = data.user_id;
                        $cookies.put('user', data.user_id);
                        $cookies.put('logged', true);
                        $('.ui.modal.register').modal('hide');
                        alert("註冊成功！");
                        $state.go('home', {}, {
                            reload: true
                        });
                        // $state.go('home',{}, {reload:true});
                    }
                });
            }
        });
    }
]);
