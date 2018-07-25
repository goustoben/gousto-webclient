@if($address !== null)
	<p>If you're not in where should we leave your box?</p>
	<select name="delivery_instructions" class="form-control account-select leave-box-select" required>
		<option value="">Please select an option</option>
		@foreach($leave_box_options as $option)
			<option value="{{{ $option  }}}" {{{ $option === $selected_option ? 'selected' : ''}}}>
				{{{ $option }}}
			</option>
		@endforeach
	</select>
	<div class="leave-box-custom {{{ !in_array($selected_option, ['Neighbour', 'Other']) ? 'hide-soft' : ''}}}">
		{{-- maxlength is overwritten in javascript, but if not set here bootstrap maxlength does not work --}}
		{{ Form::text('delivery_instructions_custom', $delivery_instructions, ['class' => 'form-control leave-box-input', 'maxlength' => '50', 'placeholder' => 'Where should we leave your box?']) }}
		<p class="leave-box-text {{{ $selected_option !== 'Other' ? 'hide-soft' : ''}}}">To ensure your box is delivered safely, we cannot accept instructions to leave boxes over fences, through windows, in bins/bin cupboard, wheelie bins or too exposed to the elements.</p>
	</div>
@else
	<p>If you're not in where should we leave your box?</p>
	<select name="delivery_instructions" class="form-control account-select leave-box-select" required>
		<option value="">Please select an option</option>
		@foreach($leave_box_options as $option)
			<option value="{{{ $option  }}}">{{{ $option }}}</option>
		@endforeach
	</select>
	<div class="leave-box-custom hide-soft">
		{{ Form::text('delivery_instructions_custom', null, ['class' => 'form-control leave-box-input', 'maxlength' => '50', 'placeholder' => 'Where should we leave your box?']) }}
		<p class="leave-box-text hide-soft">To ensure your box is delivered safely, we cannot accept instructions to leave boxes over fences, through windows, in bins/bin cupboard, wheelie bins or too exposed to the elements.</p>
	</div>
@endif
