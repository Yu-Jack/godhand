angular
    .module('godhand')
    .controller('LoginCtrl', LoginCtrl)
    .controller('RegisterCtrl', RegisterCtrl);

LoginCtrl.$inject = ['$rootScope', '$scope', '$state', '$cookies', 'AuthService'];
function LoginCtrl($rootScope, $scope, $state, $cookies, AuthService) {
    $scope.count = 0;
    $scope.submit = function() {
        AuthService.login($scope.email, $scope.password)
            .success(function(data, status, headers, config) {
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
                    $scope.count += 1;
                }
            }).error(function(data, status, headers, config) {
                console.log('error');
            });
    };
}

RegisterCtrl.$inject = ['$rootScope', '$scope', '$state', '$cookies', 'AuthService'];
function RegisterCtrl($rootScope, $scope, $state, $cookies, AuthService) {
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
                AuthService.register($scope.name, $scope.email, $scope.password)
                    .success(function(data) {
                        if (data.success) {
                            $rootScope.logged = true;
                            $rootScope.user = data.user_id;
                            $cookies.put('user', data.user_id);
                            $cookies.put('logged', true);
                            $('.ui.modal.register').modal('hide');
                            alert("註冊成功！");
                            $state.go('home', {}, {
                                reload: true
                            });
                        }
                    });
            }
        });
}
