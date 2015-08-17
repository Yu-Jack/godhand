angular
    .module('godhand')
    .controller('SalesCtrl', SalesCtrl)
    .controller('SalesDetailCtrl', SalesDetailCtrl)
    .directive('salesImages', salesImages);


function salesImages() {
    return function(scope, element, attr) {
        if (scope.$last) {
            $('.slick').slick({
                dots: true
            });
       		scope.minwidth = $('.slick').width();
        }
    }
}

SalesCtrl.$inject = ['$rootScope', '$scope', 'SalesService'];

function SalesCtrl($rootScope, $scope, SalesService) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "購物";

    SalesService.getSales()
        .success(function(data) {
            data.sales.forEach(function(value, index) {
                value.image_url = $rootScope.server + value.image_url;
                value.authavatar = $rootScope.server + value.authavatar;
            });
            $scope.sales = data.sales;
        });
}

SalesDetailCtrl.$inject = ['$rootScope', '$scope', 'SalesService', '$stateParams', 'ProfileService'];

function SalesDetailCtrl($rootScope, $scope, SalesService, $stateParams, ProfileService) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.pagetitle = "商品資訊";
    SalesService.getSalesDetail($stateParams.salesId)
        .success(function(data) {
            data.images.forEach(function(value, index) {
                value.image_url = $rootScope.server + value.image_url;
            });
            $scope.images = data.images;
            $scope.image_count = data.images.length;

            data.sales.image_url = $rootScope.server + data.sales.image_url;
            $scope.sales = data.sales;

            data.comments.forEach(function(value, index) {
                value.avatar = $rootScope.server + value.avatar;
            });
            $scope.comments = data.comments;

        });

    $scope.Reply = function(salesId) {

        SalesService.reply(salesId, $('.reply .field textarea').val()).success(function(data) {
            if (data.success) {
                ProfileService.getProfile().success(function(data2) {
                    $scope.comments.push({
                        name: data2.user.name,
                        avatar: $rootScope.server + data2.user.avatar,
                        comment: $('.reply .field textarea').val(),
                        created_at: new Date()
                    });
                    $('.reply .field textarea').val("");
                });
            }
        });
    }
}
