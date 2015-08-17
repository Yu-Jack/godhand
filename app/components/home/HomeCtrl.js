angular
    .module('godhand')
    .controller('MenuCtrl', MenuCtrl)
    .controller('GetImgCtrl', GetImgCtrl)
    .controller('IndexCtrl', IndexCtrl);

GetImgCtrl.$inject = ['$rootScope', '$scope', 'HomeService', 'LikeService'];

function GetImgCtrl($rootScope, $scope, HomeService, LikeService) {
    if ($('.sidebar').hasClass('visible')) {
        $('.left.sidebar').sidebar('toggle');
    }
    $scope.images = HomeService.getData();
    $rootScope.pagetitle = "作品";

    $scope.like = function(id) {
        LikeService.like(id).success(function(data) {
            if (data.exist === false) {
                alert('請先登入！');
            } else {
                if (data.insert === true) {
                    $.grep($scope.images, function(e) {
                        if (e.id === id) {
                            e.favorite = e.favorite + 1;
                            e.isLiked = true;
                        }
                    });
                } else {
                    $.grep($scope.images, function(e) {
                        if (e.id === id) {
                            e.favorite = e.favorite - 1;
                            e.isLiked = false;
                        }
                    });
                }
            }
        }).error(function() {
            console.log('fail');
        });
    }
    $scope.order = function(feature) {
        if ('hot' === feature) {
            $scope.reverse = true;
        } else {
            $scope.reverse = false;
        }
    }
}

MenuCtrl.$inject = ['$rootScope', '$scope'];

function MenuCtrl($rootScope, $scope) {
    $scope.menu = function() {
        $('.left.sidebar').sidebar('toggle');
    }
    $rootScope.$watch('pagetitle', function() {
        $scope.pagetitle = $rootScope.pagetitle;
    });
}

IndexCtrl.$inject = ['$rootScope', '$scope'];

function IndexCtrl($rootScope, $scope) {
    $('.banner').attr('style', 'height:' + ($(window).height()) + 'px;');
    $('.banner').attr('data-natural-height', $(window).height());
    $('.banner').parallax({
        zIndex: 2,
        positionX: '0px',
        positionY: '0px'
    });
    $('.gotop').click(function() {
        $('html, body').stop().animate({
            scrollTop: 0
        });
    });
    $rootScope.pagetitle = "";
    $('.knowmore').click(function() {
        $('html, body').stop().animate({
            scrollTop: $('#about').offset().top - 50
        }, 1500);
    });
}
