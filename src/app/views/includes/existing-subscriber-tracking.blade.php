<?php
// Define data to be tracked
if(isset($user)){
	try {
		$segmentData = array(
			'firstName' => ucfirst($user['name_first']),
			'lastName' => ucfirst($user['name_last']),
			'name' => ucfirst($user['name_first']) . ' ' . ucfirst($user['name_last']),
			'email' => $user['email'],
			'goustoReference' => $user['gousto_reference']
		);
	} catch(Exception $e){
		Log::notice($e);
		// Suppress errors. Analytics should not interrupt business.
	}
}
?>

@if(isset($segmentData))
	<script>
		if (typeof analytics !== "undefined") {
			try {
				var segmentData = {
					firstName: '{{{ $segmentData['firstName'] }}}',
					lastName: '{{{ $segmentData['lastName'] }}}',
					name: '{{{ $segmentData['name'] }}}',
					email: '{{{ $segmentData['email'] }}}',
					goustoReference: '{{{ $segmentData['goustoReference'] }}}'
				};
				analytics.identify('{{{ $user['id'] }}}', segmentData);
			} catch(e) {
				// Suppress errors. Analytics should not interrupt business.
			}
		}
		@if (isset($referral_count))
			var __optimizely_referralCount = '{{{ $referral_count }}}';
		@endif
	</script>
@endif
