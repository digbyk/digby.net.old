var map;
var originMarker;
var destMarker;

function initMap() {
	navigator.geolocation.getCurrentPosition(function (position) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: position.coords.latitude, lng: position.coords.longitude },
			zoom: 10
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
			var button = document.getElementById('button');
			if (Number(duration.value)/60 <= 15) {
				button.style.color = '#00ff00';
			} else if (Number(duration.value)/60 <= 30) {
				button.style.color = '#ffff00';
			} else {
				button.style.color = '#ff0000';
			}
			button.value = duration.text + ' / ' + distance.text;
			setTimeout(function() {
				button.style.color = '#000000';
				button.value = 'Are we nearly there yet?';
			}, 5000);
		});
	});
}
function calc(position) {


}