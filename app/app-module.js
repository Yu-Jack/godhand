
angular.module('godhand', ['uiGmapgoogle-maps']).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);
angular.module('godhand', ["ui.router", "ngCookies", "angular-loading-bar" ,"uiGmapgoogle-maps", "ngFileUpload"]);