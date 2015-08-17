angular
	.module('godhand')
	.service('SalesService', SalesService);

SalesService.$inject = ['$rootScope', '$http'];

function SalesService ($rootScope, $http) {
	this.getSales = function(){
		return $http.get($rootScope.server + 'sales');
	}

	this.getSalesDetail = function(id){
		return $http.get($rootScope.server + 'sales/' + id);
	}

	this.reply = function(salesId, text) {
        var req = {
            method: 'POST',
            url: $rootScope.server + 'sales_comment',
            data: $.param({
                user: $rootScope.user,
                salesId: salesId,
                text: text
            })
        }
        return $http(req);
    }
}