var taskBaseWidth = 400;

{

	let closeTimeout;
	$('#td-filter-difficuilty').on('mouseover', () => {
		$('#filter-settings-panel-difficuilty')[0].style.zIndex = '800';
		$('#filter-settings-panel-difficuilty')[0].style.opacity = '1';
		clearTimeout(closeTimeout);
	});

	$('#td-filter-difficuilty').on('mouseleave', () => {
		closeTimeout = setTimeout(() => {
			$('#filter-settings-panel-difficuilty')[0].style.opacity = '0';
			$('#filter-settings-panel-difficuilty')[0].style.zIndex = '-10';
		}, 200);
	});

	$('#filter-settings-panel-difficuilty').on('mouseover', () => {
		$('#filter-settings-panel-difficuilty')[0].style.opacity = '1';
		$('#filter-settings-panel-difficuilty')[0].style.zIndex = '800';
		clearTimeout(closeTimeout);
	});

	$('#filter-settings-panel-difficuilty').on('mouseleave', () => {
		closeTimeout = setTimeout(() => {
			$('#filter-settings-panel-difficuilty')[0].style.opacity = '0';
			$('#filter-settings-panel-difficuilty')[0].style.zIndex = '-10';
		}, 200)
	});

	for (let divDifficuilty of $('#filter-settings-panel-difficuilty')[0].childNodes) {
		if (divDifficuilty.tagName == 'DIV') {
			divDifficuilty.onclick = () => {
				$('#td-filter-difficuilty')[0].style.color = '#3498db';
				$('#choose-filter-sign-difficuilty')[0].innerHTML = divDifficuilty.innerHTML;
				TaskManager.Filter.setDifficuilty(divDifficuilty.innerHTML);
				TaskManager.filtrate();
				$('#choose-filter-difficuilty-icon')[0].style.top = '-8px';
				$('#choose-filter-sign-difficuilty')[0].style.bottom = '5px';
				$('#choose-filter-sign-difficuilty')[0].style.opacity = '1';
			}
		}
	}

	let bookmarkSelect = false;
	$('#td-filter-bookmark').on('click', () => {
		bookmarkSelect = !bookmarkSelect;
		TaskManager.Filter.setOnlyMarked(bookmarkSelect);
		TaskManager.filtrate();
		if (bookmarkSelect) {
			$('#td-filter-bookmark')[0].style.color = '#3498db';
		} else {
			$('#td-filter-bookmark')[0].style.color = '#95a5a6';
		}
	})

	let mapEnabled = false;
	$('#td-filter-map').on('click', () => {
		mapEnabled = !mapEnabled;
		if (mapEnabled) {
			main_map.show();
			main_map.redraw();
			$('#td-filter-map')[0].style.color = '#3498db';
			taskBaseWidth = 0;
			for (let elem of document.getElementsByClassName('ava-task-div')) {
				elem.style.width = taskBaseWidth + 'px';
			}
			// $('#task-base')[0].style.width = '401px';
		} else {
			// main_map.hide();
			$('#td-filter-map')[0].style.color = '#95a5a6';
			taskBaseWidth = 400;
			for (let elem of document.getElementsByClassName('ava-task-div')) {
				elem.style.width = taskBaseWidth + 'px';
			}	
			// $('#task-base')[0].style.width = '701px';
			console.log('set')
		}
	})
}