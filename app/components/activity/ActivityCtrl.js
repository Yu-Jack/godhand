godhandControllers.controller('ActivityCtrl', ['$scope', '$http',
    function($scope, $http) {
        if ($('.sidebar').hasClass('visible')) {
            $('.left.sidebar').sidebar('toggle');
        }
        $('.special.cards .image').dimmer({on: 'hover'});
    }
]);
