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
}
