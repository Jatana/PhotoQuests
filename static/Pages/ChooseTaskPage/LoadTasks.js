{
	$('#task-base')[0].style.height = $(document).height() - 51 + 'px';
	$.ajax({
		url: '/cli/get_tasks/',
	}).done((resp) => {
		let tasks = resp.tasks;
		for (let task of tasks) {
			let avaTaskDiv = document.createElement('div');
			avaTaskDiv.className = 'ava-task-div';
			let taskGeoPosDiv = document.createElement('div');
			taskGeoPosDiv.className = 'task-geopos-div';
			let geoIcon = document.createElement('i');
			geoIcon.className = 'material-icons';
			geoIcon.innerHTML = 'place';
			let geoPosText = document.createElement('div');
			geoPosText.style.display = 'inline';
			geoPosText.style.position = 'relative';
			geoPosText.style.top = '-6px';
			let taskClaimButton = document.createElement('div');
			taskClaimButton.className = 'task-claim-button';
			taskClaimButton.innerHTML = 'claim task';

			geoPosText.innerHTML = task.location;

			taskGeoPosDiv.appendChild(geoIcon);
			taskGeoPosDiv.appendChild(geoPosText);
			taskGeoPosDiv.appendChild(taskClaimButton);

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
			iconTrendingUp.className = 'material-icons';
			iconTrendingUp.innerHTML = 'trending_up';
			iconTrendingUp.style.color = '#797979';
			iconTrendingUp.style.marginLeft = '100px';

			let taskDifficuiltyValue = document.createElement('div');
			taskDifficuiltyValue.className = 'task-difficuilty-value';
			taskDifficuiltyValue.innerHTML = task.difficuilty;

			taskMetaInfoDiv.appendChild(accLogo);
			taskMetaInfoDiv.appendChild(taskPosterName);
			taskMetaInfoDiv.appendChild(iconTrendingUp);
			taskMetaInfoDiv.appendChild(taskDifficuiltyValue);
			

			avaTaskDiv.appendChild(taskMetaInfoDiv);
			let lat, lng;
			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json',
				data: {
					address: task.location,
					key: 'AIzaSyCc_-YOaGnCH8qiuq03ek6T221fVsgH5UE'
				}
			}).done((resp) => {
				console.log(resp);
				emap.setCenter(resp.results[0].geometry.location);
				lat = resp.results[0].geometry.location.lat;
				lng = resp.results[0].geometry.location.lng;
				console.log(lat, lng)
				let marker = new google.maps.Marker({
					position: {lat: lat, lng: lng},
					map: main_map,
					icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00',
					title: 'Task'
				});
			});

			console.log('realupd');

			avaTaskDiv.onmouseover = () => {
				console.log(resp);
				main_map.setCenter({lat: lat, lng: lng});
			}

			$('#task-base')[0].appendChild(avaTaskDiv);
		}
	})
}