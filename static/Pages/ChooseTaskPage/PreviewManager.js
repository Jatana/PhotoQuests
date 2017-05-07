var previewOnResize;

let TaskPreview = new (function() {
	let curTask = undefined;
	let curLoadSubmission = 0;
	this.setTask = (task) => {
		curTask = task;
		$('#preview-geo-pos-text')[0].innerHTML = task.name;
		$('#preview-task-description-div')[0].innerHTML = task.description;
		$('#task-user-submissions-panel')[0].innerHTML = '';
		curLoadSubmission = 0;
		// setInterval(loadSubmissions, 1000);
	}

	$('#task-preview-close-button').on('click', () => {
		$('#task-big-preview')[0].style.zIndex = -100;
		$('#task-big-preview')[0].style.opacity = 0;
	})

	previewOnResize = () => {
		let width = document.body.getBoundingClientRect().width;
		let height = document.body.getBoundingClientRect().height;
		let previewWidth = 700;
		let previewHeight = 500;
		$('#task-big-preview')[0].style.left = ((width - previewWidth) / 2) + 'px';
		$('#task-big-preview')[0].style.top = ((height - previewHeight) / 2) + 'px';
	};
	previewOnResize();
	document.body.onresize = previewOnResize;

	$('#task-preview-submit-button-shadow')[0].addEventListener('change', function() {
		let reader = new FileReader();
		let file = this.files[0];
		reader.onload = function() {

			let arrayBuffer = this.result,
			array = new Uint8Array(arrayBuffer);
			let data = new FormData();
			data.append('image', file);
			data.set('target_task_id', curTask.id);
			console.log(data);
			$('#preview-spinner')[0].style.display = 'inline';
			console.log('IMP2', LoginManager.username);
			$.ajax({
				url: '/cli/add_submission/',
				// data: {
				// 	'bytes': array.toString(),
				// 	'target_task_id': curTask.id
				// }
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST'
			}).done((resp) => {
				if (resp.status == 'OK') {
					// $('#task-preview-submit-button')[0].innerHTML = 'submitted';
				} else {
					console.log(resp);
				}
			})
		}
		reader.readAsArrayBuffer(this.files[0]);
	}, false);

	let loadSubmissions = () => {
		if (curTask != undefined) {
			$.ajax({
				url: '/cli/get_submission/',
				data: {
					'target_task_id': curTask.id,
					'submit_number': curLoadSubmission
				}
			}).done((resp) => {
				if (resp.status == 'OK') {
					curLoadSubmission++;
					$('#task-user-submissions-props')[0].innerHTML = 
						'Your submissions ' + '(' + curLoadSubmission + ')';

					let img = document.createElement('img');
					img.className = 'user-submission-img';
					img.height = 180;
					img.src = '/cli/get_image/?id=' + resp.submission.submit_image_id;
					$('#task-user-submissions-panel')[0].appendChild(
						getNiceImage('/cli/get_image/?id=' + resp.submission.submit_image_id)
					);
					setTimeout(loadSubmissions, 100);
				} else {
					setTimeout(loadSubmissions, 1000);
				}
			})
		} else {
			setTimeout(loadSubmissions, 1000);
		}
	};
	loadSubmissions();

})();