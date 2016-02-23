var map;
var originMarker;
var destMarker;

function initMap() {
	navigator.geolocation.getCurrentPosition(function (position) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: position.coords.latitude, lng: position.coords.longitude },
			zoom: 12
		});
		originMarker = new google.maps.Marker({
			position: { lat: position.coords.latitude, lng: position.coords.longitude },
			map: map,
			title: 'You are here'
		});
	});
	//var watchID = navigator.geolocation.watchPosition(function(position) {
	//	map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude }); 
	//});
}
function calcToDestination() {
	navigator.geolocation.getCurrentPosition(function (position) {
		map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
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
			console.log(response);
			var distance = response.rows[0].elements[0].distance;
			var duration = response.rows[0].elements[0].duration;
			if (Number(duration.value)/60 <= 15) {
				document.getElementById('answer').style.backgroundColor = '#ffff00';
			} else if (Number(duration.value)/60 <= 30) {
				document.getElementById('answer').style.backgroundColor = '#00ff00';
			} else {
				document.getElementById('answer').style.backgroundColor = '#ff0000';
			}
			document.getElementById('answer').value = duration.text + ' / ' + distance.text;
		});
	});
}
function calc(position) {


}