module.exports = function (path) {
	return new Promise(function (resolve, reject) {
		let image = new Image();

		image.onload  = resolve;
		image.onerror = resolve;

		image.src = path;
	});
};
