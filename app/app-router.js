angular
    .module('godhand')
    .config(config)
    .run(run);

config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    'cfpLoadingBarProvider',
    '$locationProvider',
    'uiGmapGoogleMapApiProvider'
]

function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA8Q6U7Za14E_V5U1vNeHZztlndngWRLYo',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise('/');
    // cfpLoadingBarProvider.includeSpinner = false;
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: "app/components/home/index.html",
            controller: "IndexCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "app/components/home/home.html",
            controller: "GetImgCtrl"
        })
        .state('followed', {
            url: "/followed",
            templateUrl: "app/components/followed/followed.html",
            controller: "FollowedCtrl"
        })
        .state('following', {
            url: "/following",
            templateUrl: "app/components/following/following.html",
            controller: "FollowingCtrl"
        })
        .state('favorite', {
            url: "/favorite",
            templateUrl: "app/components/favorite/favorite.html",
            controller: "FavoriteCtrl"
        })
        .state('profile', {
            url: "/profile/:userId",
            templateUrl: "app/components/profile/profile.html",
            controller: "ProfileCtrl"
        })
        .state('image', {
            url: "/image/:imageId",
            templateUrl: "app/components/imagedetail/imagedetail.html",
            controller: "ImageDetailCtrl"
        })
        .state('image_upload', {
            url: "/image_upload",
            templateUrl: "app/components/profile/profile_upload.html",
            controller: "ImageUploadCtrl"
        })
        .state('profile_edit', {
            url: "/profile_edit",
            templateUrl: "app/components/profile/profile_edit.html",
            controller: "ProfileEditCtrl"
        })
        .state('activity', {
            url: "/activity",
            templateUrl: "app/components/activity/activity.html",
            controller: "ActivityCtrl"
        })
        .state('activity_detail', {
            url: "/activity_detail/:activity_id",
            templateUrl: "app/components/activity/activity_detail.html",
            controller: "ActivityDetailCtrl"
        })
        .state('activity_create', {
            url: "/activity_create",
            templateUrl: "app/components/activity/activity_create.html",
            controller: "ActivityCreateCtrl"
        });
}

run.$inject = ['$rootScope', '$state', '$http', '$cookies'];

function run($rootScope, $state, $http, $cookies) {
    $rootScope.server = "http://140.118.155.25:6600/";
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    $rootScope.user = $cookies.get('user');
    $rootScope.logged = $cookies.get('logged');
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $('.parallax-mirror').remove();
            $('.gotop').click(function() {
                $('html, body').stop().animate({
                    scrollTop: 0
                });
            });
            $('html, body').scrollTop(0);
        });
}
