{
	let loginButton = document.getElementById('login-button');
	let loginPanel = document.getElementById('login-panel');
	let inputUsername = document.getElementById('login-input-username');
	let buttonRegister = document.getElementById('form-register-button');
	let buttonActionRegister = document.getElementById('form-action-register-button');
	let buttonLogin = document.getElementById('form-login-button');
	let inputEmail = document.getElementById('login-input-email');
	let inputPassword = document.getElementById('login-input-password');
	let loginHeaderSep = document.getElementById('login-login-register-sep');
	// let header = document.getElementsByTagName('header')[0];
	loginButton.onclick = () => {
		let enable;
		if (loginPanel.style.opacity == '') {
			enable = true;
		} else if (loginPanel.style.opacity == '0') {
			enable = true;
		} else {
			enable = false;
		}
		loginPanel.style.opacity = enable ? '1' : '0';
		if (enable) inputUsername.focus();
	};


	buttonRegister.onclick = () => {
		loginPanel.style.width = '300px';
		loginPanel.style.left = '-250px';
		loginPanel.style.height = '175px';
		inputEmail.style.display = 'block';
		buttonRegister.style.background = 'white';
		buttonLogin.style.display = 'none';
		loginHeaderSep.style.display = 'none';
		// buttonRegister.style.borderRadius = '10px';
		// buttonRegister.style.border = '5px solid white';
		// buttonRegister.style.borderRight = '50px solid white';
		inputEmail.style.width = '200px';
		inputUsername.style.width = '200px';
		inputPassword.style.width = '200px';
		buttonRegister.style.display = 'none';
		// setTimeout(() => {
		// 	buttonRegister.
		// 	buttonRegister.style.border = 'none';
		// }, 1200);
		buttonActionRegister.style.display = 'inline';
	};
};
