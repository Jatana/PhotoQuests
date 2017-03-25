document.body.onload = () => {		
	let joinButton = document.getElementById('join-button');
	let crossPanel = document.getElementById('cross-panel');
	let mainLogoSignWhite = document.getElementById('main-logo-sign-white');
	joinButton.onclick = () => {
		console.log('click')
		crossPanel.style.top = '-600px';
		crossPanel.style.left = '-200px';
		mainLogoSignWhite.style.opacity = 0;
	}
}