TaskManager = new (function() {
	Filter = new (function() {
		let diff = 'all';
		let only_marked = false;
		this.setDifficuilty = (_diff) => {
			diff = _diff;
		}

		this.setOnlyMarked = (_only_marked) => {
			only_marked = _only_marked;
		}

		this.fit = (task) => {
			if (only_marked) {
				if (!task.marked) return false;
			}
			if (diff != 'all') {
				if (task.difficuilty.toUpperCase() != diff.toUpperCase()) return false;
			}
			return true;
		}
	})();

	this.Filter = Filter;
	this.filtrate = () => {
		for (let task of this.tasks) {
			if (Filter.fit(task)) {
				task.innerElem.style.display = 'block';
			} else {
				task.innerElem.style.display = 'none';
			}
		}
	}


	$('#task-base')[0].style.height = $(document).height() - 182 + 'px';
	$.ajax({
		url: '/cli/get_tasks/',
	}).done((resp) => {
		console.log('responsed', resp);
		let tasks = resp.tasks;
		for (let task of tasks) {
			console.log(task);
			let avaTaskDiv = document.createElement('div');
			avaTaskDiv.className = 'ava-task-div';
			let taskGeoPosDiv = document.createElement('div');
			taskGeoPosDiv.className = 'task-geopos-div';
			let geoIcon = document.createElement('i');
			geoIcon.className = 'material-icons';
			geoIcon.innerHTML = 'place';
			let geoPosText = document.createElement('div');
			geoPosText.className = 'geo-pos-text';
			geoPosText.style.display = 'inline';
			geoPosText.style.position = 'relative';
			geoPosText.style.top = '-6px';

			let taskBookmark = document.createElement('div');
			taskBookmark.className = 'task-bookmark material-icons';
			taskBookmark.style.fontSize = '30px';
			taskBookmark.innerHTML = 'bookmark_border';

			let taskClaimButton = document.createElement('div');
			taskClaimButton.className = 'task-claim-button';
			taskClaimButton.innerHTML = 'submit photo';

			geoPosText.innerHTML = task.name;

			// taskGeoPosDiv.appendChild(geoIcon);
			let taskMetaPanel = document.createElement('div');
			taskMetaPanel.className = 'task-meta-panel';

			taskMetaPanel.appendChild(taskBookmark);
			taskMetaPanel.appendChild(taskClaimButton);



			taskGeoPosDiv.appendChild(geoPosText);
			taskGeoPosDiv.appendChild(taskMetaPanel);

			avaTaskDiv.appendChild(taskGeoPosDiv);

			let taskDescriptionDiv = document.createElement('div');
			taskDescriptionDiv.className = 'task-description-div';
			taskDescriptionDiv.innerHTML = task.description;

			avaTaskDiv.appendChild(taskDescriptionDiv);

			let taskMetaInfoDiv = document.createElement('div');
			taskMetaInfoDiv.className = 'task-meta-info-div';
			taskMetaInfoDiv.style.zIndex = '300';

			let accLogo = document.createElement('img');
			accLogo.className = 'task-poster-account-logo';
			accLogo.src = '/static/Logos/SomeLogo.png';

			let taskPosterName = document.createElement('div');
			taskPosterName.className = 'task-poster-name';
			taskPosterName.innerHTML = task.poster_name;


			let iconTrendingUp = document.createElement('i');
			iconTrendingUp.className = 'material-icons task-difficuilty-icon';
			iconTrendingUp.innerHTML = 'trending_up';

			let taskDifficuiltyValue = document.createElement('div');
			taskDifficuiltyValue.className = 'task-difficuilty-value';
			taskDifficuiltyValue.innerHTML = task.difficuilty;

			let taskDifficuiltyPanel = document.createElement('div');
			taskDifficuiltyPanel.className = 'task-difficuilty-panel';
			taskDifficuiltyPanel.appendChild(iconTrendingUp);
			taskDifficuiltyPanel.appendChild(taskDifficuiltyValue);

			taskMetaInfoDiv.appendChild(accLogo);
			taskMetaInfoDiv.appendChild(taskPosterName);
			taskMetaInfoDiv.appendChild(taskDifficuiltyPanel);
			

			avaTaskDiv.appendChild(taskMetaInfoDiv);
			let lat, lng;
			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json',
				data: {
					address: task.location,
					key: 'AIzaSyCc_-YOaGnCH8qiuq03ek6T221fVsgH5UE'
				}
			}).done((resp) => {
				// console.log('real resp');
				// main_map.map.setCenter(resp.results[0].geometry.location);
				lat = resp.results[0].geometry.location.lat;
				lng = resp.results[0].geometry.location.lng;
				// console.log(lat, lng)
				let tryAddMarker = () => {
					if (main_map && main_map.map) {
						let marker = new google.maps.Marker({
							position: {lat: lat, lng: lng},
							map: main_map.map,
							icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=dollar|FFFFFF',
							// icon: 'http://127.0.0.1:8000/static/Logos/AspectRatio.png',
							title: 'Task'
						});

						let infoWindow = new google.maps.InfoWindow({
							content: 'kek'
						});

						infoWindow.open(main_map.map, marker);
					} else {
						setTimeout(tryAddMarker, 200);
					}
				}
				tryAddMarker();
			});


			taskBookmark.onclick = () => {
				taskBookmark.innerHTML = 'bookmark';
				task.marked = true;
				TaskManager.filtrate();
			}


			avaTaskDiv.onmouseover = () => {
				console.log(resp);
				main_map.map.setCenter({lat: lat, lng: lng});
			}

			taskClaimButton.onclick = () => {
				$('#task-big-preview')[0].style.opacity = 1;
				$('#task-big-preview')[0].style.zIndex = 900;
				TaskPreview.setTask(task);
				previewOnResize();
			}

			task.innerElem = avaTaskDiv;
			$('#task-base')[0].appendChild(avaTaskDiv);
		}
		this.tasks = tasks;
	})
})();