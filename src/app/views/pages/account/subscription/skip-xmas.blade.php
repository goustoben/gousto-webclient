@if(\Carbon\Carbon::now() <= \Config::get('deliveries.xmas_cutoff'))
	<div class="form-group account-subscription-pause-box text-center">
		<div class="account-subscription-pause-formsection">
			<p class="account-subscription-pause-body">Don't want any deliveries over the Christmas period ({{{
				\Carbon\Carbon::now()->max(\Config::get('deliveries.xmas_start'))->format('jS F') }}} - {{{ \Config::get('deliveries.xmas_end')->format('jS F') }}})?</p>
			{{ Form::button('Skip Christmas', ['id' => 'skip_xmas', 'class' => 'gbtn-primary ladda-button', 'data-url' => URL::route('user.skip-xmas'), 'data-style' => 'slide-left' ]) }}
		</div>
	</div>
@endif
