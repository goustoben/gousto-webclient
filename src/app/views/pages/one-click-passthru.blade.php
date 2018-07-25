<?php
	$url = URL::route('one-click-reactivate', array($token)) . '?email=' . Input::get('email') .
		'&promo=' . Input::get('promo');
?>
<script>
	window.location.href = '{{{ $url }}}';
</script>
