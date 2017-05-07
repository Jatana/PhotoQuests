var initGoogleMap = () => {};

var GoogleMapLoader = new (function(){
	let path = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCc_-YOaGnCH8qiuq03ek6T221fVsgH5UE&libraries=places&callback=initGoogleMap';

	this.loaded = false;
	let cbs = [];
	this.addOnLoadCb = (cb) => {
		if (this.loaded) {
			cb();
		} else {
			cbs[cbs.length] = cb;
		}
	}

	$.ajax({
		url: path,
		dataType: 'script',
		async: true
	})

	initGoogleMap = () => {
		console.log('reback', google)
		for (let cb of cbs) {
			cb();
		}
	}
})();

let ScriptLoader = function(path) {	
	this.loaded = false;
	let cbs = [];
	this.addOnLoadCb = (cb) => {
		if (this.loaded) {
			cb();
		} else {
			cbs[cbs.length] = cb;
		}
	}

	$.ajax({
		url: path,
		dataType: 'script',
		async: true
	}).done(() => {
		this.loaded = true;
		for (let cb of cbs) {
			cb();
		}
	})
}

var MapLoader = new ScriptLoader('/static/Maps/GoogleMap.js?rekus=123');