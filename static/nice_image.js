{
	let bigImage = document.createElement('img');
	bigImage.id = 'big-image';
	document.body.appendChild(bigImage);
}

let getNiceImage = (src) => {
	let preImg = document.createElement('div');
	let img = document.createElement('img');
	let hoverOpen = document.createElement('div');
	let extendBlock = document.createElement('i');
	extendBlock.className = 'extend-image-icon material-icons';
	extendBlock.style.fontSize = '60px';
	extendBlock.innerHTML = 'fullscreen';
	hoverOpen.appendChild(extendBlock);
	preImg.className = 'div-submission-img';
	hoverOpen.className = 'hover-submission-img';
	img.src = src;
	preImg.appendChild(img);
	preImg.appendChild(hoverOpen);
	img.height = 200;
	img.className = 'submission-img';
	preImg.onclick = () => {
		ScreenDarker.enable();
		$('#big-image')[0].src = img.src;
		$('#big-image')[0].style.display = 'block';
		let update = () => {
			let width = $('#big-image')[0].getBoundingClientRect().width;
			let height = $('#big-image')[0].getBoundingClientRect().height;
			$('#big-image')[0].style.left = 'calc(50% - ' + (width / 2) + 'px)';
			$('#big-image')[0].style.top = 'calc(50% - ' + (height / 2) + 'px)';
		}
		setTimeout(update, 10);
		setInterval(update, 500);
		let disable = () => {
			ScreenDarker.disable();
			$('#big-image')[0].style.display = 'none';
		}

		$('#screen-darker').on('click', disable);
		$('#big-image').on('click', disable);
	}
	return img;
	return preImg;
}