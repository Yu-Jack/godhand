godhandControllers.controller('ActivityCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
        if ($('.sidebar').hasClass('visible')) {
            $('.left.sidebar').sidebar('toggle');
        }


        $http.get($rootScope.server + 'activity')
            .success(function(data) {
                data.activitys.forEach(function(value, index) {
                    value.image_url = $rootScope.server + value.image_url;
                    value.authavatar = $rootScope.server + value.authavatar;
                });

                $scope.activitys = data.activitys;

                $scope.$watch('activitys', function(newValue, oldValue) {
                    $('.special.cards .image').dimmer({
                        on: 'hover'
                    });
                });
            });
    }
]);
godhandControllers.controller('ActivityDetailCtrl', ['$rootScope', '$scope', '$http', '$stateParams',
    function($rootScope, $scope, $http, $stateParams) {
        if ($('.sidebar').hasClass('visible')) {
            $('.left.sidebar').sidebar('toggle');
        }
        var req = {
            method: 'post',
            url : $rootScope.server + 'activity_detail',
            data: $.param({
                user: $rootScope.user,
                id: $stateParams.activity_id
            })
        }
        $http(req).success(function(data) {
            $scope.isAttend = data.isAttend;
            if( data.isAttend ){
                $scope.attend_message = "取消參加";
            }else{
                $scope.attend_message = "參加";
            }
            data.activity.image_url = $rootScope.server + data.activity.image_url;
            $scope.activity = data.activity;

        });
        $scope.success = false;
        $scope.attend = function(id){
            var req = {};
        	req = {
        		method: 'post',
        		url : $rootScope.server + 'activity_attend',
        		data: $.param({
        			user: $rootScope.user,
        			id: id
        		})
        	}
        	$http(req).success(function(data){
                $scope.isAttend = data.isAttend;
        		if( data.isAttend ){
                    $scope.attend_message = "取消參加";
                }else{
                    $scope.attend_message = "參加";
                }
        	});
        }
    }
]);
godhandControllers.controller('ActivityCreateCtrl', ['$rootScope', '$scope', '$http', '$state',
    function($rootScope, $scope, $http, $state) {
        if ($('.sidebar').hasClass('visible')) {
            $('.left.sidebar').sidebar('toggle');
        }

        $('.ui.form').form({
            fields: {
                title: {
                    identifier: 'title',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your name'
                    }]
                },
                image: {
                    identifier: 'image',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please upload your image'
                    }]
                },
                description: {
                    identifier: 'description',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your description'
                    }]
                },
                position: {
                    identifier: 'position',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your position'
                    }]
                },
                start: {
                    identifier: 'start',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please select your start time'
                    }]
                },
                end: {
                    identifier: 'end',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please select your end time'
                    }]
                }
            },
            onSuccess: function() {
                if (Date.parse($('#end').val()) > Date.parse($('#start').val())) {
                    var req = {
                        method: 'post',
                        url: $rootScope.server + 'activity',
                        data: $.param({
                            image: $('#target').attr('src'),
                            name: $('#fileupload').prop('files')[0].name,
                            title: $scope.title,
                            description: $scope.description,
                            position: $scope.position,
                            start_time: $('#start').val(),
                            end_time: $('#end').val(),
                            user: $rootScope.user
                        })
                    }
                    $http(req).success(function(data) {
                        if (data.success) {
                            $state.go('activity_detail', {
                                activity_id: data.activity_id
                            }, {
                                reload: true
                            });
                        }
                    });
                } else {
                    alert('結束時間需大於開始時間');
                }
            }
        });

        $('#start, #end').datetimepicker({
            "dateFormat": "yy-mm-dd",
            "timeFormat": "HH:mm"
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
    }
]);
