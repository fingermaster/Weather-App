
var weatherApp = angular.module('weatherApp', ['ngResource', 'ngRoute', 'ngAnimate']);

weatherApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/start.html',
		controller:  'indexController'
	})
	.when('/start', {
		templateUrl: 'pages/start.html',
		controller:  'indexController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller:  'forecastController'
	})
	.when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller:  'forecastController'
	})
}]); // END weatherApp.config

weatherApp.controller('indexController', ["$scope", "$resource", "$location", "cityService", "daysService",
						   		function(  $scope,   $resource,   $location,   cityService,   daysService  ) {
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
	$scope.days = daysService.days;
	$scope.$watch('days', function() {
		daysService.days = $scope.days;
	});

	// Allows Angular ng-submit to send formdata on button click or enter key from input
	// Put ng-submit="submit()" on the form tag.
	$scope.submit = function() {
		$location.path("/forecast");
	}

}]);

weatherApp.controller('forecastController', ["$scope", "$filter", "cityService", "daysService", "weatherService", "$routeParams",
						   		   function(  $scope,   $filter,   cityService,   daysService,   weatherService,   $routeParams ) {
	
	$scope.city = cityService.city;
	$scope.days = daysService.days;

	// Run service and get weather forecast
	$scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days )

	// Formatting scripts
	$scope.convertToFarenheight = function(degK) {
		return Math.round((1.8 * ( degK - 273)) + 32);
	}
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}
	$scope.toTitleCase = function(str) {
    	return str.replace(/\w\S*/g, function(txt){
    		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    	});
	}
	// Clicking weather day invokes the ng-click and ng-class on forecast directive
	// I was testing how to use angular for meaningful animations
	$scope.itemClicked = function ($index) {
	    $scope.selectedIndex = $index;
	};

}]);

//Custom Directive
weatherApp.directive("weatherReport", function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace: true,
		scope: {
			weatherDay: "=", 		// = Object
			convertToStandard: "&", // & Functions
			convertToDate: "&",
			toTitleCase: "&",
			dateFormat: "@", 		// @ is a string in this scope
			city: "=?"
		}
	}
});

weatherApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);










