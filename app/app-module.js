
angular.module('godhand', ['uiGmapgoogle-maps']).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);
var godhand = angular.module('godhand', ["ui.router", "ngCookies", "angular-loading-bar" , "godhandControllers","uiGmapgoogle-maps"]);
var godhandControllers = angular.module('godhandControllers', []);


