{
	$.ajax({
		url: '/cli/get_submissions/',
		data: {
			only_ids: true
		}
	}).done((resp) => {
		if (resp.status == 'OK') {
			for (let id of resp.ids) {
				$.ajax({
					url: '/cli/get_submission/',
					data: {
						eid: id
					}
				}).done((resp) => {
					if (resp.status == 'OK') {
						$('#user-submissions-panel')[0].appendChild(
							getNiceImage('/cli/get_image/?id=' + resp.submission.submit_image_id)
						);
					}
				})
			}
		}
	});

	let setNames = () => {
		if (LoginManager.username) {
			$('#div-profile-login')[0].innerHTML = LoginManager.username;
			$('#img-profile')[0].src = '/cli/get_image/?id=' + LoginManager.profile_image_id;
		} else {
			setTimeout(setNames, 20);
		}
	}

	setNames();


	$('#profile-photo-button')[0].addEventListener('change', function() {
		let reader = new FileReader();
		let file = this.files[0];
		reader.onload = function() {
			let data = new FormData();
			data.append('image', file);
			$.ajax({
				url: '/cli/userdb/update_profile_image/',
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST'
			}).done((resp) => {
				if (resp.status == 'OK') {
					$('#img-profile')[0].src = '/cli/get_image/?id=' + resp.new_id;
				}
			})
		}
		reader.readAsArrayBuffer(this.files[0]);
	}, false);


}