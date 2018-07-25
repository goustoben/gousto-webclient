let roundTime = function(time) {
	time = time.clone();
	let min = parseInt(time.format('m'));
	if (min > 50) {
		time.add(60 - min, 'minutes');
	}

	return time;
}

module.exports = roundTime;
