var previewOnResize;

let TaskPreview = new (function() {
	let curTask;
	let curLoadSubmission = 0;
	this.setTask = (task) => {
		curTask = task;
		setInterval(loadSubmissions, 1000);
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
		reader.onload = function() {

			let arrayBuffer = this.result,
			array = new Uint8Array(arrayBuffer);
			// console.log(array, array.toString());
			$('#preview-spinner')[0].style.display = 'inline';
			console.log('IMP2', LoginManager.username);
			$.ajax({
				url: '/cli/add_submission/',
				data: {
					'bytes': array.toString(),
					'_temp_secret': LoginManager.username,
					'target_task_id': curTask.id
				}
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
		$.ajax({
			url: '/cli/get_submission/',
			data: {
				'_temp_secret': LoginManager.username,
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
				$('#task-user-submissions-panel')[0].appendChild(img);
			}
		})
	};

})();