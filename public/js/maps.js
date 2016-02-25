var map;
var directionsService;
var directionsDisplay;

function initMap() {
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	navigator.geolocation.getCurrentPosition(function (position) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: position.coords.latitude, lng: position.coords.longitude },
			zoom: 10
		});
	});

	//var watchID = navigator.geolocation.watchPosition(function(position) {
	//	map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude }); 
	//});
}
function calcToDestination() {
	directionsDisplay.setMap(null);
	directionsDisplay.setMap(map);
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
			var distance = response.rows[0].elements[0].distance;
			var duration = response.rows[0].elements[0].duration;
			var button = document.getElementById('button');
			if (Number(duration.value) / 60 <= 15) {
				button.style.color = '#00ff00';
			} else if (Number(duration.value) / 60 <= 30) {
				button.style.color = '#aaaa00';
			} else {
				button.style.color = '#ff0000';
			}
			button.value = duration.text + ' / ' + distance.text;
			setTimeout(function () {
				button.style.color = '#000000';
				button.value = 'Are we nearly there yet?';
			}, 5000);
		});
		calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);
	});
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
	directionsService.route({
		origin: origin,
		destination: destination,
		travelMode: google.maps.TravelMode.DRIVING
	}, function (response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}