angular
    .module('godhand')
    .service('ImageDetailService', ImageDetailService);

ImageDetailService.$inject = ['$rootScope', '$http'];

function ImageDetailService($rootScope, $http) {
    var self = this;
    self.getDetail = function(id) {
        return $http.get($rootScope.server + 'image/' + id);
    }
    self.reply = function(imageId, text) {
        var req = {
            method: 'POST',
            url: $rootScope.server + 'comment',
            data: $.param({
                user: $rootScope.user,
                imageId: imageId,
                text: text
            })
        }
        return $http(req);
    }

    self.getPreNext = function(images, currentid){
        var current_idnex = images.indexOf(currentid),
            max = images.length-1;

        var order ={
            left_value:0,
            right_value:0,
            min:-1,
            max:max,
            current:current_idnex
        }
        if( current_idnex === 0){
            order.right_value = parseInt(images[current_idnex + 1]);
        }else if ( current_idnex === max){
            order.left_value = parseInt(images[current_idnex - 1]);
        }else{
            order.left_value = parseInt(images[current_idnex - 1]);
            order.right_value = parseInt(images[current_idnex + 1]);
        }
        return order;
    }
}
