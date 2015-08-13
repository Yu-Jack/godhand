angular
    .module('godhand')
    .service('ActivityService', ActivityService);

ActivityService.$inject = ['$rootScope', '$http'];

function ActivityService($rootScope, $http) {
    this.getAll = function() {
        return $http.get($rootScope.server + 'activity');
    }

    this.getDetail = function(id) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'activity_detail',
            data: $.param({
                user: $rootScope.user,
                id: id
            })
        };
        return $http(req);
    }

    this.getAdress = function(address) {
        return $http.get('http://maps.google.com/maps/api/geocode/json?address=' + address);
    }

    this.attend = function(id) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'activity_attend',
            data: $.param({
                user: $rootScope.user,
                id: id
            })
        };
        return $http(req);
    }

    this.create = function(params) {
        var req = {
            method: 'post',
            url: $rootScope.server + 'activity',
            data: $.param({
                image: params.image,
                name: params.image,
                title: params.title,
                description: params.description,
                position: params.position,
                start_time: params.start_time,
                end_time: params.end_time,
                user: $rootScope.user
            })
        };
        return $http(req);
    }
}
