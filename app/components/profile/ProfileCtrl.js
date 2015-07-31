godhandControllers.controller('ProfileCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function($rootScope, $scope, $http, $state, $stateParams) {
        if ($('.sidebar').hasClass('visible')) {
            $('.left.sidebar').sidebar('toggle');
        }

        $scope.logged = $rootScope.logged;
        $scope.images = [];
        var req = {
            method: 'post',
            url: $rootScope.server + 'user_profile',
            data: $.param({
                targetId: $stateParams.userId,
                userId: $rootScope.user
            })
        };
        $http(req).success(function(data) {

            if (data.isFollow) {
                $scope.isFollow = true;
                $scope.follow = '取消追蹤';
            } else {
                $scope.isFollow = false;
                $scope.follow = '追蹤';
            }

            data.user.avatar = $rootScope.server + data.user.avatar;

            if ($stateParams.userId == $rootScope.user) {
                $scope.self = true;
            } else {
                $scope.self = false;
            }

            $scope.user = data.user;

            data.user.image.forEach(function(value, index) {
                value.image_url = $rootScope.server + value.image_url;
                $scope.images.push(value);
            });
        });

        $scope.Follow = function(id) {
            var req = {
                method: 'post',
                url: $rootScope.server + 'follow',
                data: $.param({
                    userId: $rootScope.user,
                    followId: id
                })
            };
            $http(req).success(function(data) {
                data.target.avatar = $rootScope.server + data.target.avatar;
                $scope.user = data.target;
                if (data.success) {
                    if (data.isFollow) {
                        $scope.isFollow = true;
                        $scope.follow = '取消追蹤';
                    } else {
                        $scope.isFollow = false;
                        $scope.follow = '追蹤';
                    }
                }
            });
        }
    }
]);
godhandControllers.controller('ImageUploadCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function($rootScope, $scope, $http, $state, $stateParams) {
        if (!$rootScope.logged) {
            $state.go('home', {}, {
                reload: true
            });
        }

        $scope.submit = function() {
            var req = {
                method: 'post',
                url: $rootScope.server + 'upload',
                data: $.param({
                    image: $('#target').attr('src'),
                    name: $('#fileupload').prop('files')[0].name,
                    title: $scope.title,
                    content: $scope.content,
                    user: $rootScope.user
                })
            }
            $http(req).success(function(data) {
                if (data.success) {
                    $state.go('image', {
                        imageId: data.imageId
                    }, {
                        reload: true
                    });
                }
            });
        }

        $('#fileupload').change(function() {
            readURL(this);
        });

        function readURL(input) {
            if (input.files && input.files[0]) {
                if (input.files[0].type === "image/jpeg" || input.files[0].type === "image/png") {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        $('#target').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                } else {
                    alert('Please upload image');
                }
            }
        }

    }
]);
godhandControllers.controller('ProfileEditCtrl', ['$rootScope', '$scope', '$http', '$state', '$stateParams',
    function($rootScope, $scope, $http, $state, $stateParams) {
        if (!$rootScope.logged) {
            $state.go('home', {}, {
                reload: true
            });
        } else {
            $http.get($rootScope.server + 'user_profile/' + $rootScope.user).success(function(data) {
                $scope.description = data.user.description;
                $scope.email = data.user.email;
                $scope.name = data.user.name;
                $scope.avatar = $rootScope.server + data.user.avatar;
            });

            $('#fileupload').change(function() {
                readURL(this);
            });

            function readURL(input) {
                if (input.files && input.files[0]) {
                    if (input.files[0].type === "image/jpeg" || input.files[0].type === "image/png") {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            $('#target').attr('src', e.target.result);
                        }
                        reader.readAsDataURL(input.files[0]);
                    } else {
                        alert('Please upload image');
                    }
                }
            }

            $scope.submit = function() {
                image_name = (typeof $('#fileupload').prop('files')[0] === 'undefined' ? "" : $('#fileupload').prop('files')[0].name);

                var req = {
                    method: 'post',
                    url: $rootScope.server + 'profile_edit',
                    data: $.param({
                        image: $('#target').attr('src'),
                        image_name: image_name,
                        name: $scope.name,
                        description: $scope.description,
                        user: $rootScope.user
                    })
                }
                $http(req).success(function(data) {
                    if (data.success) {
                        // $state.go('home',{},{reload:true});
                        $state.go('profile', {
                            userId: $rootScope.user
                        }, {
                            reload: true
                        });
                    }
                });
            }

        }
    }
]);
