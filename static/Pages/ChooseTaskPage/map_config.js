var main_map;

{
	MapLoader.addOnLoadCb(() => {
		console.log('running');
		let getMapWidth = () => {
			console.log('resize, ', window.innerWidth, taskBaseWidth, 70);
			return window.innerWidth - taskBaseWidth - 70;
		}
		let map = new GoogleMap(
			// $('#td-pre-map')[0].getBoundingClientRect().width - 300,
			getMapWidth(),
			$('#td-pre-map')[0].getBoundingClientRect().height
		);
		$('#div-pre-map')[0].appendChild(map.base);
		$('#td-pre-map')[0].onresize = () => {
			// console.log('KKEKSKFKMFKSMDFKSMDFK')
			map.setDimensions(
				// $('#td-pre-map')[0].getBoundingClientRect().width - 300,
				// $('#td-pre-map')[0].getBoundingClientRect().width - 300,
				getMapWidth(),
				$('#td-pre-map')[0].getBoundingClientRect().height
			);
		};
		setTimeout(() => {
			map.setDimensions(
				// $('#td-pre-map')[0].getBoundingClientRect().width,
				getMapWidth(),
				$('#td-pre-map')[0].getBoundingClientRect().height
			);
		}, 200);

		setInterval(() => {
			map.setDimensions(
				// $('#td-pre-map')[0].getBoundingClientRect().width,
				getMapWidth(),
				$('#td-pre-map')[0].getBoundingClientRect().height
			);
		}, 3000)
		map.hide();
		setTimeout(() => map.show(), 300);
		main_map = map;
	})
}