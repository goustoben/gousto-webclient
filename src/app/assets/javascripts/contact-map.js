if ($('#map-canvas').length){
	if ($(window).width() > 767) {
		loadMapScript();
	} else {
		$('#map-canvas').remove();
	}
}
function loadMapScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
	'&libraries=places&key=AIzaSyB2kvSC9iVyhXVzfNV1xPUkpir6N9G7CSE&callback=prepareMap';
	document.body.appendChild(script);
}

function prepareMap() {

	var directionsLink = 'https://www.google.co.uk/maps/dir/Shepherd\'s+Bush+Market,+London/gousto/@51.5051593,-0.2399569,16z/data=!4m14!4m13!1m5!1m1!1s0x48760fd1caa1d611:0x2d3525253df07b3f!2m2!1d-0.22635!2d51.50558!1m5!1m1!1s0x48760e253c042995:0x4bf29e9fb84765db!2m2!1d-0.248738!2d51.505958!3e3';

	var goustoMapStyle = [{
		'stylers': [{
			'saturation': -100
		}, {
			'gamma': 1
		}]
	}, {
		'elementType': 'labels.text.stroke',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'poi.business',
		'elementType': 'labels.text',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'poi.business',
		'elementType': 'labels.icon',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'poi.place_of_worship',
		'elementType': 'labels.text',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'poi.place_of_worship',
		'elementType': 'labels.icon',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'road',
		'elementType': 'geometry',
		'stylers': [{
			'visibility': 'simplified'
		}]
	}, {
		'featureType': 'water',
		'stylers': [{
			'visibility': 'on'
		}, {
			'saturation': 50
		}, {
			'gamma': 0
		}, {
			'hue': '#50a5d1'
		}]
	}, {
		'featureType': 'administrative.neighborhood',
		'elementType': 'labels.text.fill',
		'stylers': [{
			'color': '#333333'
		}]
	}, {
		'featureType': 'road.local',
		'elementType': 'labels.text',
		'stylers': [{
			'weight': 0.5
		}, {
			'color': '#333333'
		}]
	}, {
		'featureType': 'transit.station',
		'elementType': 'labels.icon',
		'stylers': [{
			'gamma': 1
		}, {
			'saturation': 50
		}]
	}];

	var map, marker, placeId, laddaSpinner;
	var mapCenter = new google.maps.LatLng(51.5078367, -0.2420187);
	var goustoLatlng = new google.maps.LatLng(51.505958, -0.248738);

	var request = {
		placeId: 'ChIJlSkEPCUOdkgR22VHuJ-e8ks'
	};


	var infowindow = new google.maps.InfoWindow();

	function initialize() {
		var mapOptions = {
			zoom: 15,
			center: mapCenter,
			styles: goustoMapStyle,
			panControl: true,
			zoomControl: true,
			scaleControl: true,
			streetViewControl: false
		};
		map = new google.maps.Map(
			document.getElementById('map-canvas'),
			mapOptions
		);

		var service = new google.maps.places.PlacesService(map);

		var place = {
			name: 'Gousto',
			formatted_address: 'Unit 2 Issigonis House, Cowley Road, London W3 7UN, United Kingdom',
			formatted_phone_number: '020 3699 9996',
		};
		marker = new google.maps.Marker({
			map: map,
			position: goustoLatlng
		});

		google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			// fully loaded
			infowindow.open(map, marker);
			laddaSpinner.stop();
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, this);
		});

		service.getDetails(request, function(place, status) {
			infowindow.setContent(
				'<b>' +
				place.name +
				'</b><br/>' +
				place.formatted_address.replace(/,/g, ', <br/>') +
				'<br/>' +
				place.formatted_phone_number +
				'<br/>' +
				'<a class="get-directions" href="' + directionsLink + '" target="_blank">Get Directions</a>')
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	$(document).ready(function() {
		laddaSpinner = Ladda.create(document.getElementById('map-canvas'));
		laddaSpinner.start();
	});
}
