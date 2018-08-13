function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function pingdom() {
	if (getRandomInt(0, 99) < 10) {
		return (
			`<script>
			var _prum = [['id', '563b16e7abe53de96084ec42'],
			['mark', 'firstbyte', (new Date()).getTime()]];
			(function() {
				var s = document.getElementsByTagName('script')[0]
				, p = document.createElement('script');
				p.async = 'async';
				p.src = '//rum-static.pingdom.net/prum.min.js';
				s.parentNode.insertBefore(p, s);
			})();
			</script>`
		)
	}

	return ''
}

export default pingdom
