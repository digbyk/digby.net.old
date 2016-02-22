var map;

function initMap() {
	navigator.geolocation.getCurrentPosition(function (position) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: position.coords.latitude, lng: position.coords.longitude },
			zoom: 12
		});
	});
	//var watchID = navigator.geolocation.watchPosition(function(position) {
	//	map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude }); 
	//});
}
function calcToDestination() {
	navigator.geolocation.getCurrentPosition(function (position) {
		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude }); 
		var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var destination = document.getElementById('destination').value;
		map.setCenter(origin);
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix({
			origins: [origin],
			destinations: [destination],
			travelMode: google.maps.TravelMode.DRIVING,
			//transitOptions: TransitOptions,
			//drivingOptions: DrivingOptions,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			avoidHighways: false,
			avoidTolls: false,
		}, function (response, status) {
			document.getElementById('answer').value = response.rows[0].elements[0].duration.text;
		});
	});
}
function calc(position) {


}