godhandControllers.controller('ImageDetailCtrl', ['$rootScope', '$scope', '$http', '$stateParams',
    function($rootScope, $scope, $http, $stateParams) {
        // $scope.imgurl = decodeURIComponent($stateParams.imageurl);

        $('body').scrollTop();
        $scope.logged = $rootScope.logged;
        $rootScope.pagetitle = "圖片資訊";
        $http.get($rootScope.server + 'image/' + $stateParams.imageId).success(function(data) {
            $scope.image = {
                title: data.image.title,
                content: data.image.description,
                url: $rootScope.server + data.image.image_url,
                id: data.image.id
            };
            $scope.comments = [];
            data.comments.forEach(function(value, index) {
                console.log(value);
                $scope.comments.push({
                    id: value.user_id,
                    author: value.name,
                    avatar: $rootScope.server + value.avatar,
                    text: value.comment,
                    date: 'Today at 5:42PM'
                });
            });
        });

        $scope.Reply = function(imageId) {

            var req = {
                method: 'POST',
                url: $rootScope.server + 'comment',
                data: $.param({
                    user: $rootScope.user,
                    imageId: imageId,
                    text: $('.reply .field textarea').val()
                })
            }
            $http(req).success(function(data) {
                if (data.success) {
                    req = {
                        method: 'POST',
                        url: $rootScope.server + 'user_profile',
                        data: $.param({
                            userId: $rootScope.user
                        })
                    };
                    $http(req).success(function(data2) {
                        $scope.comments.push({
                            author: data2.user.name,
                            avatar: $rootScope.server + data2.user.avatar,
                            text: $('.reply .field textarea').val(),
                            date: 'Today at 5:42PM'
                        });
                        $('.reply .field textarea').val("");
                    });
                }
            });

            // $scope.comments.push({id: 5, author:'qwe', layers:1, avatar:'img/avatar.jpg', text:'Are you idiot ?', date:'Yesterday at 5:44PM'})
        }
        $scope.AddMessage = function(author) {
            // if( typeof author == 'undefined'){
            //     // For poster, put the message at the bottom
            //     $scope.comments.push({id: 5, author:'Jack', layers:0, avatar:'img/avatar.jpg', text:$('.reply .field textarea').val(), date:'Yesterday at 5:44PM'});
            // }else{
            //     var index = 0 ;
            //     $.grep($scope.comments, function(e, i){
            //         if(e.author == author){
            //             index = i;
            //             return 0;
            //         }
            //     });
            //     for (var i = index+1;i < $scope.comments.length; i++){
            //         if( $scope.comments[i].layers !=1){
            //             $scope.comments.splice(i, 0, {id: 5, author:'Jack', layers:1, avatar:'img/avatar.jpg', text:$('.reply .field textarea').val(), date:'Yesterday at 5:44PM'});
            //             break;
            //         }
            //         if( (i+1) == $scope.comments.length){
            //             $scope.comments.push({id: 5, author:'Jack', layers:1, avatar:'img/avatar.jpg', text:$('.reply .field textarea').val(), date:'Yesterday at 5:44PM'});
            //             break;
            //         }
            //     }
            // }
            $scope.comments.push({
                id: 5,
                author: 'Jack',
                avatar: 'img/avatar.jpg',
                text: $('.reply .field textarea').val(),
                date: 'Yesterday at 5:44PM'
            });

        }
    }
]);
