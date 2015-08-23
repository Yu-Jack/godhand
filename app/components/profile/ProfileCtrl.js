angular
    .module('godhand')
    .controller('ProfileCtrl', ProfileCtrl)
    .controller('ImageUploadCtrl', ImageUploadCtrl)
    .controller('ProfileEditCtrl', ProfileEditCtrl)
    .controller('ProfileSalesCtrl', ProfileSalesCtrl);

ProfileCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ProfileService', '$cookies'];

function ProfileCtrl($rootScope, $scope, $state, $stateParams, ProfileService, $cookies) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }

    $scope.logged = $rootScope.logged;
    $scope.images = [];
    $rootScope.order = [];

    ProfileService.getProfile($stateParams.userId)
        .success(function(data) {

            if (data.isFollow) {
                $scope.isFollow = true;
                $scope.follow = '取消追蹤';
            } else {
                $scope.isFollow = false;
                $scope.follow = '追蹤';
            }

            if ($stateParams.userId == $rootScope.user) {
                $rootScope.pagetitle = "個人頁面";
            } else {
                $rootScope.pagetitle = data.user.name;
            }

            data.user.avatar = $rootScope.server + data.user.avatar;

            if ($stateParams.userId == $rootScope.user) {
                $scope.self = true;
            } else {
                $scope.self = false;
            }

            $scope.user = data.user;
            var order = [];
            data.user.image.forEach(function(value, index) {
                value.image_url = $rootScope.server + value.image_url;
                order.push(value.id);
                $scope.images.push(value);
            });
            $cookies.put('order', order);
        });

    $scope.Follow = function(id) {
        ProfileService.follow(id)
            .success(function(data) {
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
    $scope.like = function(id) {

        ProfileService.like(id)
            .success(function(data) {
                if (data.exist === false) {
                    alert('請先登入！');
                } else {
                    if (data.insert === true) {
                        $.grep($scope.images, function(e) {
                            if (e.id === id) {
                                e.count_favorite = e.count_favorite + 1;
                                e.isLiked = true;
                            }
                        });
                    } else {
                        $.grep($scope.images, function(e) {
                            if (e.id === id) {
                                e.count_favorite = e.count_favorite - 1;
                                e.isLiked = false;
                            }
                        });
                    }
                }
            }).error(function() {
                console.log('fail');
            });
    }
}

ImageUploadCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ProfileService'];

function ImageUploadCtrl($rootScope, $scope, $state, $stateParams, ProfileService) {
    if (!$rootScope.logged) {
        $state.go('home', {}, {
            reload: true
        });
    }
    $rootScope.pagetitle = "圖片上傳";
    $scope.submit = function() {
        var params = {
            image: $('#target').attr('src'),
            name: $('#fileupload').prop('files')[0].name,
            title: $scope.title,
            content: $scope.content,
            user: $rootScope.user
        };
        ProfileService.upload(params)
            .success(function(data) {
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
            console.log(input.files[0].type);
            if (input.files[0].type === "image/jpeg" || input.files[0].type === "image/png") {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#target').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            } else {
                alert('Please upload image');
                alert(input.files[0].type);
            }
        }
    }
}

ProfileEditCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ProfileService'];

function ProfileEditCtrl($rootScope, $scope, $state, $stateParams, ProfileService) {
    if (!$rootScope.logged) {
        $state.go('home', {}, {
            reload: true
        });
    } else {
        $rootScope.pagetitle = "個人資料修改"

        ProfileService.getProfile()
            .success(function(data) {
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
                console.log(input.files[0].type);
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

            var params = {
                image: $('#target').attr('src'),
                image_name: image_name,
                name: $scope.name,
                description: $scope.description,
                user: $rootScope.user
            };

            ProfileService.edit(params)
                .success(function(data) {
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

ProfileSalesCtrl.$inject = ['$rootScope', '$scope', 'Upload', '$http', '$state'];

function ProfileSalesCtrl($rootScope, $scope, Upload, $http, $state) {
    var image = [];
    $('.ui.form').form({
        fields: {
            title: {
                identifier: 'title',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter title'
                }]
            },
            money: {
                identifier: 'money',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter money'
                }]
            },
            content: {
                identifier: 'content',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your description'
                }]
            }
        },
        onSuccess: function() {
            if (typeof $scope.files === 'undefined') {
                alert('please upload image');
            } else {
                async.forEachOf($scope.files, function(value, key, callback) {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(value);
                    reader.onloadend = function() {
                        base64data = reader.result;
                        image.push({
                            data: base64data,
                            name: value.name
                        });
                        return callback();
                    }
                }, function() {
                    var req = {
                        method: 'post',
                        url: $rootScope.server + 'sales_upload',
                        data: $.param({
                            userId: $rootScope.user,
                            images: image,
                            title: $scope.title,
                            content: $scope.content,
                            money: $scope.money
                        })
                    };
                    $http(req).success(function(data) {
                        if (data.success === true) {
                            $state.go('sales_detail', {
                                salesId: data.sales_id
                            }, {
                                reload: true
                            });
                        }
                    });
                });
            }
        }
    });
}
