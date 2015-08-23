angular
    .module('godhand')
    .controller('ImageDetailCtrl', ImageDetailCtrl);

ImageDetailCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'ImageDetailService', 'ProfileService', '$cookies'];

function ImageDetailCtrl($rootScope, $scope, $stateParams, ImageDetailService, ProfileService, $cookies) {
    $('body').scrollTop();
    $scope.logged = $rootScope.logged;
    $rootScope.pagetitle = "圖片資訊";

    var order = $cookies.get('order').split(',');

    if(typeof order  !== 'undefined'){
        $scope.order = ImageDetailService.getPreNext(order, $stateParams.imageId);
        $scope.noorder = false;
    }else{
        $scope.noorder = true;
    }
    
    async.series([
        function(callback) {
            ImageDetailService.getDetail($stateParams.imageId).success(function(data) {
                $scope.image = {
                    title: data.image.title,
                    content: data.image.description,
                    url: $rootScope.server + data.image.image_url,
                    id: data.image.id
                };
                $scope.comments = [];
                data.comments.forEach(function(value, index) {
                    $scope.comments.push({
                        id: value.user_id,
                        author: value.name,
                        avatar: $rootScope.server + value.avatar,
                        text: value.comment,
                        date: value.created_at
                    });
                });
                callback(null, 'one');
            });
        },
        function(callback) {
            $('.detail').removeClass("none");
            $('.detail').addClass("animated fadeInRight");
        }
    ])

    $scope.Reply = function(imageId) {

        ImageDetailService.reply(imageId, $('.reply .field textarea').val()).success(function(data) {
            if (data.success) {
                ProfileService.getProfile().success(function(data2) {
                    $scope.comments.push({
                        author: data2.user.name,
                        avatar: $rootScope.server + data2.user.avatar,
                        text: $('.reply .field textarea').val(),
                        date: new Date()
                    });
                    $('.reply .field textarea').val("");
                });
            }
        });
    }
}
