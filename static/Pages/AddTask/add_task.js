var subMap;

$('#table-add-task')[0].style.display = 'none';

$('#add-task-button').on('click', () => {
	$('#screen-darker')[0].style.display = 'block';
	$('#screen-darker')[0].style.zIndex = '600';
	$('#screen-darker')[0].style.opacity = 0.8;
	$('#table-add-task')[0].style.display = 'block';

	$('#screen-darker').on('click', () => {
		$('#screen-darker')[0].style.zIndex = '-10';
		$('#screen-darker')[0].style.display = 'none';
		$('#table-add-task')[0].style.display = 'none';
	})
});


{
	MapLoader.addOnLoadCb(() => {
		let getMapWidth = () => {
			// console.log('resize, ', window.innerWidth, taskBaseWidth, 70);
			return window.innerWidth - 500;
		}

		let getMapHeight = () => {
			return $('#table-add-task')[0].getBoundingClientRect().height;
		}

		let map = new GoogleMap(
			// $('#add-task-td-pre-map')[0].getBoundingClientRect().width - 300,
			getMapWidth(),
			getMapHeight()
		);
		$('#add-task-td-pre-map')[0].appendChild(map.base);
		$('#add-task-td-pre-map')[0].onresize = () => {
			// console.log('KKEKSKFKMFKSMDFKSMDFK')
			map.setDimensions(
				// $('#add-task-td-pre-map')[0].getBoundingClientRect().width - 300,
				// $('#add-task-td-pre-map')[0].getBoundingClientRect().width - 300,
				getMapWidth(),
				getMapHeight()
			);
		};
		setTimeout(() => {
			map.setDimensions(
				// $('#add-task-td-pre-map')[0].getBoundingClientRect().width,
				getMapWidth(),
				getMapHeight()
			);
		}, 1000);

		setInterval(() => {
			map.setDimensions(
				// $('#add-task-td-pre-map')[0].getBoundingClientRect().width,
				getMapWidth(),
				getMapHeight()
			);
		}, 3000);

		let updateCurrentPosition = () => {
			let lat, lng;
			if (map.map.streetView.getVisible()) {
				lng = map.map.streetView.getPosition().lng();
				lat = map.map.streetView.getPosition().lat();
			} else {
				lng = map.getCenter().lng();
				lat = map.getCenter().lat();
			}
			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json',
				data: {
					'latlng': lat + ',' + lng,
					'key': 'AIzaSyCc_-YOaGnCH8qiuq03ek6T221fVsgH5UE'
				}
			}).done((response) => {
				console.log(response.results[0].formatted_address);
				$('#input-place')[0].value = response.results[0].formatted_address;
			})
			// $('#input-place')[0].value = lat + '' + lng;
		}

		map.base.onmousemove = updateCurrentPosition;
		setTimeout(updateCurrentPosition, 1000);

		map.hide();
		setTimeout(() => map.show(), 300);
		subMap = map;
	})
}