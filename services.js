
// Custom Services
weatherApp.service('cityService', function(){
	var self = this;
});

weatherApp.service('daysService', function(){
	var self = this;
});

weatherApp.service('weatherService', [ "$resource", function($resource)  {
	this.GetWeather = function(city, days) {
		var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily"); 
		// , {callback: "JSON_CALLBACK"},{ get: {method: "JSONP"}} ^^^
		var appid = "bd82977b86bf27fb59a04b61b657fb6f";
		return weatherResult = weatherAPI.get({ q: city, cnt: days, appid: appid });
	}
	
}])