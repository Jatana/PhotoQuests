LoginManager = new (function() {
	let self = this;
	this.login = (username, password) => {
		console.log(username);
		self.username = username;
		$('#login-button')[0].style.display = 'none';
		$('#register-button')[0].style.display = 'none';
		$('#account-info')[0].style.display = 'block';
		$('#self-account-username')[0].innerHTML = username;
	};

	$('#register-button').on('click', () => {
		// location = '/register';
		// console.log($('#screen-darker'));
		$('#screen-darker')[0].style.display = 'block';
		$('#screen-darker')[0].style.zIndex = '600';
		$('#screen-darker')[0].style.opacity = 0.8;
		$('#div-register-form')[0].style.display = 'block';
	})

	$('#login-button').on('click', () => {
		$('#screen-darker')[0].style.display = 'block';
		$('#screen-darker')[0].style.zIndex = '600';
		$('#screen-darker')[0].style.opacity = 0.8;
		$('#div-login-form')[0].style.display = 'block';
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
})