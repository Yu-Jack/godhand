godhand.config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

    // For any unmatched url, send to /route1
    // $urlRouterProvider.otherwise('/');
    // cfpLoadingBarProvider.includeSpinner = false;
    $stateProvider
        .state('home', {
            url: "/",
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
        .state('image_upload',{
            url: "/image_upload",
            templateUrl: "app/components/profile/profile_upload.html",
            controller: "ImageUploadCtrl"
        })
        .state('profile_edit',{
            url: "/profile_edit",
            templateUrl: "app/components/profile/profile_edit.html",
            controller: "ProfileEditCtrl"
        })
        .state('activity',{
            url: "/activity",
            templateUrl: "app/components/activity/activity.html",
            controller: "ActivityCtrl"
        })
        .state('activity_detail',{
            url: "/activity_detail/:activity_id",
            templateUrl: "app/components/activity/activity_detail.html",
            controller: "ActivityDetailCtrl"
        })
        .state('activity_create',{
            url: "/activity_create",
            templateUrl: "app/components/activity/activity_create.html",
            controller: "ActivityCreateCtrl"
        });

});

godhand.run(function($rootScope, $state, $http, $cookies) {
    $rootScope.server = "http://yujack.docker:8080/";
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
    // This only run one time
    // if (typeof $rootScope.logged == 'undefined' || $rootScope.logged == false) {
    //     $location.path('/');
    // }
    $rootScope.user = $cookies.get('user');
    $rootScope.logged = $cookies.get('logged');
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            // console.log($state);
            // if( toState.name == 'home'){
            //     $state.go('profile');
            //     event.preventDefault();
            // }
        });
});
// godhand.run(function($rootScope, $location) {

//     // register listener to watch route changes
//     $rootScope.$on("$routeChangeStart", function(event, next, current) {
//         // if ($rootScope.loggedUser == null) {
//         //     // no logged user, we should be going to #login
//         //     if (next.templateUrl == "/profile") {
//         //         // already going to #login, no redirect needed
//         //     } else {
//         //         // not going to #login, we should redirect now
//         //         $location.path("/");
//         //     }
//         // }
//     });
// })
