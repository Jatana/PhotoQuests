{
	// $('#div-compare-panel')[0].style.zIndex = -1000;


	$('#div-compare-panel')[0].style.display = 'none';
	$('#compare-button').on('click', () => {
		$('#screen-darker')[0].style.display = 'block';
		$('#screen-darker')[0].style.zIndex = '600';
		$('#screen-darker')[0].style.opacity = 0.8;
		$('#div-compare-panel')[0].style.display = 'block';

	})
	$('#div-compare-panel-close').on('click', () => {
		$('#div-compare-panel')[0].style.display = 'none';
		$('#screen-darker')[0].style.zIndex = '-10';
		$('#screen-darker')[0].style.display = 'none';
	})
}