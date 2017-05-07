let GoogleMap = function(width, height) {
	let startPlace = { lat: 40.729884, lng: -73.990988 };
	let base = document.createElement('div');
	let self = this;
	this. setDimensions = (width, height) => {
		base.style.width = width + 'px';
		base.style.height = height + 'px';
		this.redraw();
	}

	this. hide = () => {
		base.style.display = 'none';
	}

	this. show = () => {
		base.style.display = 'block';
	}

	this. redraw = () => {
		if (typeof google != 'undefined') {
			google.maps.event.trigger(this.map, 'resize');
		}
	}

	this. showStreetView = () => {
		self.map.streetView.setVisible(true);
	}

	this. hideStreetView = () => {
		self.map.streetView.setVisible(false);
	}

	this. getCenter = () => {
		return this.map.getCenter();
	}

	// this.setDimensions(width, height);
	base.style.width = width + 'px';
	base.style.height = height + 'px';

	GoogleMapLoader.addOnLoadCb(() => {
		let map = new google.maps.Map(base, {
			center: startPlace,
			zoom: 18,
			streetViewControl: true,
			mapTypeId: google.maps.MapTypeId.HYBRID
		});
		self.map = map;
		let controlPanel = document.createElement('div');
		controlPanel.className = 'map-control-panel';
		base.appendChild(controlPanel);
		let searchInput = document.createElement('input');
		searchInput.className = 'controls map-search-input';
		var searchBox = new google.maps.places.SearchBox(searchInput);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		});

		var markers = [];
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}

			// Clear out the old markers.
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];

			// For each place, get the icon, name and location.
			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				// Create a marker for each place.
				markers.push(new google.maps.Marker({
					map: map,
					icon: icon,
					title: place.name,
					position: place.geometry.location
				}));

				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});
			map.fitBounds(bounds);
		});
	});

	this.base = base;
}