godhandControllers.controller('GetImgCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http){
        
        if( $('.sidebar').hasClass('visible') ){
            $('.left.sidebar').sidebar('toggle');
        }
        $scope.images = [];
        $rootScope.pagetitle = "作品";
        var request = {
            method: 'post',
            url: $rootScope.server +'image',
            data: $.param({ user_id:$rootScope.user})
        }
        $http(request).success(function(data){
            data.images.forEach(function(value, index){
                $scope.images.push({
                    id: value.id,
                    authId: value.authId,
                    imageurl: $rootScope.server + value.image_url,
                    auth:value.auth,
                    authavatar:$rootScope.server +value.authavatar,
                    comments: value.count_comments,
                    views: value.count_views,
                    favorite: value.count_favorite,
                    isLiked:value.isLiked
                });
            });
        });

        $scope.like = function(id){
            var req = {
                method:'post',
                url:$rootScope.server + 'like',
                data: $.param({user_id:$rootScope.user, image_id:id})
            }
            
            $http(req).success(function(data){
                if(data.exist === false){
                    alert('請先登入！');
                }else{
                    if(data.insert === true){
                        $.grep($scope.images, function(e){
                            if(e.id ===id){
                                e.favorite = e.favorite + 1;
                                e.isLiked = true;
                            }
                        });
                    }else{
                        $.grep($scope.images, function(e){
                            if(e.id ===id){
                                e.favorite = e.favorite - 1;
                                e.isLiked = false;
                            }
                        });
                    }
                }
            }).error(function(){
                console.log('fail');
            });
        }
    }
]);

godhandControllers.controller('MenuCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
        $scope.menu = function(){
            $('.left.sidebar').sidebar('toggle');
        }

        $scope.pagetitle = $rootScope.pagetitle;
    }
]);

godhandControllers.controller('IndexCtrl', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
        $('.banner').attr('style', 'height:' + ($(window).height()) + 'px;');
	$('.banner').attr('data-natural-height', $(window).height());
	$('.banner').parallax({
	    zIndex:0,
	    positionX: '0px',
	    positionY: '0px'
	});
        $rootScope.pagetitle = "";
        $('.knowmore').click(function(){
            $('html, body').stop().animate({
                scrollTop: $('#about').offset().top - 50
            }, 1500);
        });
    }
]);
