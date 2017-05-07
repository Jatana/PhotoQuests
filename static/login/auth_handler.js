LoginManager = new (function() {
	let self = this;
	$('#self-account-icon').on('click', () => {
		location = '/profile';
	})
	this.login = (username, password, profile_image_id) => {
		self.username = username;
		self.profile_image_id = profile_image_id;
		$('#login-button')[0].style.display = 'none';
		$('#register-button')[0].style.display = 'none';
		$('#account-info')[0].style.display = 'block';
		$('#self-account-username')[0].innerHTML = username;
		$('#self-account-icon')[0].src = '/cli/get_image/?id=' + self.profile_image_id;
	};

	$('#register-button').on('click', () => {
		// location = '/register';
		// console.log($('#screen-darker'));
		ScreenDarker.enable();
		$('#div-register-form')[0].style.display = 'block';


		$('#screen-darker').on('click', () => {
			ScreenDarker.disable();
			$('#div-register-form')[0].style.display = 'none';
		})
	})

	$('#login-button').on('click', () => {
		console.log('kekuuuuus');
		ScreenDarker.enable();
		$('#div-login-form')[0].style.display = 'block';

		$('#screen-darker').on('click', () => {
			ScreenDarker.disable();
			$('#div-login-form')[0].style.display = 'none';
		})
	})

	$('#action-register-button').on('click', () => {
		let username = $('#register-input-username')[0].value;
		let password = $('#register-input-password')[0].value;
		let email = $('#register-input-email')[0].value;	
		console.log(username, password, email);

		$.ajax({
			url: '/cli/register/',
			data: {
				'username': username,
				'password': password,
				'email': email
			}
		}).done((respone) => {
			console.log(respone);
			if (respone.status == 'FAILED') {
				console.log($('#login-input-' + respone.key)[0])
				// $('#login-input-' + respone.key)[0].style.borderBottom = '1px solid red';
				$('#register-error')[0].style.display = 'block';
				$('#register-error')[0].innerHTML = respone.error;
			} else if (respone.status == 'OK') {
				$('#screen-darker')[0].style.zIndex = '-10';
				$('#screen-darker')[0].style.display = 'none';
				$('#div-register-form')[0].style.display = 'none';
				this.login(username, password);
			}
		});
	});

	$('#action-login-button').on('click', () => {
		let username = $('#login-input-username')[0].value;
		let password = $('#login-input-password')[0].value;
		console.log(username, password);

		$.ajax({
			url: '/cli/login/',
			data: {
				'username': username,
				'password': password,
			}
		}).done((respone) => {
			console.log(respone);
			if (respone.status == 'FAILED') {
				console.log($('#login-input-' + respone.key)[0])
				// $('#login-input-' + respone.key)[0].style.borderBottom = '1px solid red';
				$('#login-error')[0].style.display = 'block';
				$('#login-error')[0].innerHTML = respone.error;
			} else if (respone.status == 'OK') {
				$('#screen-darker')[0].style.zIndex = '-10';
				$('#screen-darker')[0].style.display = 'none';
				$('#div-login-form')[0].style.display = 'none';
				console.log("prc", username, password);
				this.login(username, password);
			}
		});
	});

	if (Cookies.get('session_id')) {
		$.ajax({
			url: '/cli/get_user_data/'
		}).done((resp) => {
			if (resp.status == 'OK') {
				this.login(resp.user.name, "", resp.user.profile_image_id);
			}
		})
	}
})