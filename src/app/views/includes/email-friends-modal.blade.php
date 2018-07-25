@if(!empty($user))
	<?php $referral = isset($user['referral-code']) ? $user['referral-code'] : ''; ?>
	<div class="modal fade gmodal" id="emailFriendsModal" tabindex="-1" role="dialog" aria-hidden="true" data-userid="{{{$user['id']}}}">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">Refer a friend - Get &pound;{{{ Config::get('referral.whats_for_you') }}}</h4>
				</div>
				<div id="email-success" style="display:none;">
					<div class="modal-body">
						<p>Emails sent!</p>
					</div>
					<div class="modal-footer">
						<a id="invite-more-friends" class="gbtn-secondary">Invite more friends!</a>
					</div>
				</div>
				<div id="email-form-section">
					{{ Form::open( array(
						'id' => 'refer-a-friend-form',
						'method' => 'post',
						'url' => 'user/current/referral',
						'role' => 'form',
					)) }}
						<div class="modal-body">
							<p>Enter your friend's email below:</p>
							@for($i = 0; $i < 3; $i++)
								<div class="row">
									<div class="form-group col-sm-12">
										{{ Form::email('emails[]', null, array('class' => 'form-control', 'placeholder' => "Your friend's email", 'autocomplete' => 'off')) }}
									</div>
								</div>
							@endfor
						</div>
						<div class="modal-footer">
							<button class="gbtn-primary" type="submit" id="send-refer-a-friend">Send Email</button>
						</div>
					{{ Form::close() }}
				</div>
			</div>
		</div>
	</div>
@endif
