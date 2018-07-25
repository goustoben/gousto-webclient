<div>
	<form id="account-comms-pref-form" method="POST" action="{{ route('user-details.update-communication-preferences') }}">
		<input type="hidden" name="marketing_do_allow_email" value="0">
		<input type="hidden" name="marketing_do_allow_phone" value="0">
		<input type="hidden" name="marketing_do_allow_post" value="0">
		<input type="hidden" name="marketing_do_allow_sms" value="0">
		<input type="hidden" name="marketing_do_allow_thirdparty" value="0">
		<div>
			<p>Get exclusive offers, fun tips and updates, and be the first to hear about Gousto’s newest, tastiest recipes</p>
			<div>
				<input type="checkbox" id="email-opt-in" name="marketing_do_allow_email" class="comm-pref-checkbox" value="1" {{ $marketing_do_allow_email === '1' ? 'checked' : '' }}>
				<label for="email-opt-in">
					Email
				</label>
			</div>
			<div>
				<input type="checkbox" id="phone-opt-in" name="marketing_do_allow_phone" class="comm-pref-checkbox" value="1" {{ $marketing_do_allow_phone === '1' ? 'checked' : '' }}>
				<label for="phone-opt-in">
					Phone
				</label>
			</div>
			<div>
				<input type="checkbox" id="post-opt-in" name="marketing_do_allow_post" class="comm-pref-checkbox" value="1" {{ $marketing_do_allow_post === '1' ? 'checked' : '' }}>
				<label for="post-opt-in">
					Post
				</label>
			</div>
			<div>
				<input type="checkbox" id="sms-opt-in" name="marketing_do_allow_sms" class="comm-pref-checkbox" value="1" {{ $marketing_do_allow_sms === '1' ? 'checked' : '' }}>
				<label for="sms-opt-in">
					SMS
				</label>
			</div>
		</div>
		<div id="third-party-opt-in-container">
			<label for="third-party-opt-in">
				<input type="checkbox" id="third-party-opt-in" name="marketing_do_allow_thirdparty" class="comm-pref-checkbox" value="1" {{ $marketing_do_allow_thirdparty === '1' ? 'checked' : '' }} />
				Get relevant communications from Gousto's partners, like special promotions and free product samples
			</label>
		</div>
		<p class="detail-error text-danger" style="display:none"></p>
		<input disabled type="submit" value="Save changes" id="account-comms-pref-submit" class="gbtn-secondary btn-block disabled">
	</form>
</div>
