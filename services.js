
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
		var appid = "761b60e8cebcc618d6897b4f4a7a1fad";
		return weatherResult = weatherAPI.get({ q: city, cnt: days, appid: appid });
	}
	
}])