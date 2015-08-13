angular
    .module('godhand')
    .service('ProfileService', ProfileService);

ProfileService.$inject = ['$rootScope', '$http'];

function ProfileService($rootScope, $http) {
    var self = this;

    self.getProfile = function(id) {
        var data = {
            userId: $rootScope.user
        };
        if( typeof id  !== 'undefined'){
            data.targetId = id;
        }
        var req = {
            method: 'POST',
            url: $rootScope.server + 'user_profile',
            data: $.param(data)
        };
        return $http(req);
    }

    self.follow = function(id) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'follow',
            data: $.param({
                userId: $rootScope.user,
                followId: id
            })
        };
        return $http(req);
    }

    self.like = function(image_id) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'like',
            data: $.param({
                user_id: $rootScope.user,
                image_id: image_id
            })
        };
        return $http(req);
    }

    self.upload = function(params) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'upload',
            data: $.param({
                image: params.image,
                name: params.name,
                title: params.title,
                content: params.content,
                user: params.user
            })
        };
        return $http(req);
    }

    self.edit = function(params) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'profile_edit',
            data: $.param({
                image: params.image,
                image_name: params.image_name,
                name: params.name,
                description: params.description,
                user: params.user
            })
        };
        return $http(req);
    }
}
