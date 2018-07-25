{{ Form::open(['route' => $route, 'class' => 'account-address', 'data-number' => $address['id'], 'id' => ((!empty($address['id'])) ? 'account-postcode-' . $address['id'] : 'account-new-address-form-') . mt_rand(0, 100000000)]) }}
	@if($for_delivery)
		{{ Form::text('name', $address['name'], ['placeholder' => 'Name (e.g. Home, Work)', 'class' => 'form-control', 'required']) }}
		@include('pages.account.includes.delivery-instruction-select')
	@endif
	<span class="clearfix">
		<span class="account-postcode-container pull-left">{{ Form::text('postcode', (isset($address) && isset($address['postcode'])) ? $address['postcode'] : null, ['placeholder' => 'Postcode', 'class' => 'form-control account-postcode', 'required']) }}</span>
		<button class="gbtn-secondary account-postcode-lookup ladda-button pull-left" data-style="slide-left" data-validate="false" data-selid="postcode-search">Look it up</button>
	</span>
	<div class="account-address-list"></div>
	<button class="account-address-cant-find account-function">Can't find your address?</button>
	<div class="account-address-details">
		{{ Form::text('companyname', $address['companyname'] ? $address['companyname'] : null, ['placeholder' => 'Company Name', 'readonly', 'class' => 'form-control' . (empty($address['companyname']) ? ' empty' : '')]) }}
		{{ Form::text('line1', $address['line1'] ? $address['line1'] : null, ['placeholder' => 'Address Line 1', 'required', 'readonly', 'class' => 'form-control' . (empty($address['line1']) ? ' empty' : '')]) }}
		{{ Form::text('line2', $address['line2'] ? $address['line2'] : null, ['placeholder' => 'Address Line 2', 'readonly', 'class' => 'form-control' . (empty($address['line2']) ? ' empty' : '')]) }}
		{{ Form::text('line3', $address['line3'] ? $address['line3'] : null, ['placeholder' => 'Address Line 3', 'readonly', 'class' => 'form-control' . (empty($address['line3']) ? ' empty' : '')]) }}
		{{ Form::text('town', $address['town'] ? $address['town'] : null, ['placeholder' => 'Town', 'required', 'readonly', 'class' => 'form-control' . (empty($address['town']) ? ' empty' : '')]) }}
		{{ Form::text('county', $address['county'] ? $address['county'] : null, ['placeholder' => 'County', 'readonly', 'class' => 'form-control' . (empty($address['county']) ? ' empty' : '')]) }}
		<button class="account-address-details-edit account-function" @if (!empty($address['line1'])) style="display: inline-block;" @endif >Edit</button>
	</div>
	{{ Form::hidden('type', isset($type) ? $type : 'shipping') }}
	<button type="submit" class="gbtn-secondary btn-block ladda-button" data-style="slide-left" data-selid="save-changes">Save</button>
{{ Form::close() }}
