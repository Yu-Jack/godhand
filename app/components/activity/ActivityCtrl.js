angular
    .module('godhand')
    .controller('ActivityCtrl', ActivityCtrl)
    .controller('ActivityDetailCtrl', ActivityDetailCtrl)
    .controller('ActivityCreateCtrl', ActivityCreateCtrl);

ActivityCtrl.$inject = ['$rootScope', '$scope', 'ActivityService'];

function ActivityCtrl($rootScope, $scope, ActivityService) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "藝文活動";

    ActivityService.getAll().success(function(data) {
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

ActivityDetailCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'ActivityService'];

function ActivityDetailCtrl($rootScope, $scope, $stateParams, ActivityService) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "活動資訊";

    ActivityService.getDetail($stateParams.activity_id)
        .success(function(data) {
            $scope.isAttend = data.isAttend;
            if (data.isAttend) {
                $scope.attend_message = "取消參加";
            } else {
                $scope.attend_message = "參加";
            }
            data.activity.image_url = $rootScope.server + data.activity.image_url;
            $scope.activity = data.activity;

            ActivityService.getAdress(data.activity.position)
                .success(function(data) {
                    $scope.map = {
                        center: {
                            latitude: data.results[0].geometry.location.lat,
                            longitude: data.results[0].geometry.location.lng
                        },
                        zoom: 16
                    };
                    $scope.marker = {
                        coords: {
                            latitude: data.results[0].geometry.location.lat,
                            longitude: data.results[0].geometry.location.lng
                        }
                    };
                });

        });
    $scope.success = false;
    $scope.attend = function(id) {
        ActivityService.attend(id).success(function(data) {
            $scope.isAttend = data.isAttend;
            if (data.isAttend) {
                $scope.attend_message = "取消參加";
            } else {
                $scope.attend_message = "參加";
            }
        });
    }
}

ActivityCreateCtrl.$inject = ['$rootScope', '$scope', '$state', 'ActivityService'];

function ActivityCreateCtrl($rootScope, $scope, $state, ActivityService) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "建立活動";
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
                
                var params = {
                    image: $('#target').attr('src'),
                    name: $('#fileupload').prop('files')[0].name,
                    title: $scope.title,
                    description: $scope.description,
                    position: $scope.position,
                    start_time: $('#start').val(),
                    end_time: $('#end').val(),
                    user: $rootScope.user
                };

                ActivityService.create(params)
                    .success(function(data) {
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