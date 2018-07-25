<div class="modal fade gmodal" id="cancel-account-modal" tabindex="-1" role="dialog" aria-hidden="true" data-subscription="{{{ $subscription['state'] === 'active' ? 'active' : 'inactive' }}}">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="subscription-content-header">Manage Your Account</h4>
			</div>
				@if($subscription['state'] === 'active')
					<div id="subscription-content" class="modal-body">
						<h4>A subscription that suits you.</h4>
						<p>Did you know you can choose to have your deliveries come weekly, fortnightly or even monthly? We also deliver 6 days a week, so you can pick the day that's best for you.</p>
						<a class="gbtn-secondary" href="{{{ URL::route('user-subscription.show') }}}">Edit Subscription</a>
						<hr />

						<h4>Get inspired.</h4>
						<p>Want to cook something that's not on the menu this week? With our online Cookbook, you can look through all our recipes, whenever you want.</p>
						<a class="gbtn-secondary" href="{{{ URL::to('cookbook') }}}">Browse The Cookbook</a>
						<hr />

						<h4>Need a break?</h4>
						<p>Did you know you can pause your subscription? We won't automatically schedule any deliveries for you, but you'll be able to place one-off orders whenever you want.</p>
						<a class="gbtn-secondary" href="{{{ URL::route('user-subscription.show') }}}#account-subscription-pause-section">Pause Subscription</a>
						<hr />

						<h4>Cooked out?</h4>
						<p>Do you want to cancel your account for good, rather than pause? If you're sure that's what you want, follow the link below. You can always sign up again if you change your mind.</p>
						<button class="gbtn-cancel" id="{{{ isset($pending_free_box_data) ? 'cancel-with-free-box' : 'cancel-confirm' }}}">
							Cancel Account
						</button>
					</div>
					<div class="modal-header hide-soft">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="subscription-cancel-confirm-header">Are you sure about this?</h4>
					</div>
					<div id="subscription-cancel-confirm" class="modal-body hide-soft">
						<p>Cancelling your account means your cookbook history will be lost.</p>
						<br>
						<p>If you want to stop receiving recipes from us we suggest <a href="{{{ URL::to('my-subscription') }}}" class="highlight-link">pausing your subscription</a>, you can reactivate your subscription at any time.</p>
						<br>
						<p>If you still want to cancel, please confirm here.</p>
						<br>
					</div>
					<div class="modal-footer clearfix hide-soft" id="subscription-cancel-confirm-footer">
						<form action="{{ route('user-cancel', ['id' => 'current']) }}" method="post">
							<input type="hidden" name="_method" value="delete" />
							<a class="gbtn-primary" href="{{{ URL::to('my-deliveries') }}}">
								Return to 'Deliveries'
							</a>
							<button type="submit" class="gbtn-cancel">
								Confirm Cancel Account
							</button>
						</form>
					</div>
				@endif
				@if(isset($pending_free_box_data))
					<div id="free-box-content" class="{{{ $subscription['state'] === 'active' ? 'hide-soft' : '' }}}">
						<div class="modal-body row">
							<div class="col-sm-4">
								{{ image_tag(image_path('images/icons/box-illustration.png'), array("alt" => "A Gousto Box packed full of fresh ingredients", "class" => "img-responsive cancelmodal-body-boximage", "lazy" => true)) }}
							</div>
							<div class="col-sm-8">
								@if($pending_free_box_data['boxes_until_free'] === 0 && $pending_free_box_data['has_pending_order'])
									<p>Remember, this week's box is FREE!</p>
								@elseif( $pending_free_box_data['boxes_until_free'] === 0 || $pending_free_box_data['boxes_until_free'] === 1 && $pending_free_box_data['has_pending_order'] )
									<p>Remember, your next box is FREE!</p>
								@elseif($pending_free_box_data['boxes_until_free'] === 1)
									<p>Remember, your {{{ $pending_free_box_data['free_box_with_suffix'] }}} box is FREE.<br><br>Only <span class="strong">{{{ $pending_free_box_data['boxes_until_free']}}}</span> more box before you get your {{{ $pending_free_box_data['free_box_with_suffix'] }}} scrummy box absolutely FREE!</p>
								@elseif($pending_free_box_data['boxes_until_free'] < 0)
									<p>Remember, your upcoming box is FREE!</p>
								@else
									<p>Remember, your {{{ $pending_free_box_data['free_box_with_suffix'] }}} box is FREE.<br><br>Only <span class="strong">{{{ $pending_free_box_data['boxes_until_free']}}}</span> more boxes before you get your {{{ $pending_free_box_data['free_box_with_suffix'] }}} scrummy box absolutely FREE!</p>
								@endif
							</div>
						</div>
						<div class="modal-footer">
							<form action="{{ route('user-cancel', ['id' => 'current']) }}" method="post">
								<input type="hidden" name="_method" value="delete" />
								<button type="submit" class="gbtn-cancel">
									@if($pending_free_box_data['boxes_until_free'] < 0)
										Cancel and lose my free box
									@else
										Cancel and lose my free {{{ $pending_free_box_data['free_box_with_suffix'] }}} box
									@endif
								</button>
								<a class="gbtn-primary" href="{{{ URL::route('my-account') }}}">Keep on cooking</a>
							</form>
						</div>
					</div>
				@endif
				@if($subscription['state'] === 'inactive' && !isset($pending_free_box_data))
					<div class="modal-body">
						<p>Cancelling your account means your cookbook history will be lost.</p>
						<br>
						<p>If you want to stop receiving recipes from us we suggest <a href="{{{ URL::to('my-subscription') }}}" class="highlight-link">pausing your subscription</a>, you can reactivate your subscription at any time.</p>
						<br>
						<p>If you still want to cancel, please confirm here.</p>
						<br>
					</div>
					<div class="modal-footer">
						<form action="{{ route('user-cancel', ['id' => 'current']) }}" method="post">
							<input type="hidden" name="_method" value="delete" />
							<a class="gbtn-secondary" href="{{{ URL::to('my-deliveries') }}}">
								Return to 'Deliveries'
							</a>
							<button type="submit" class="gbtn-cancel">
								Confirm Cancel Account
							</button>
						</form>
					</div>
				@endif
		</div>
	</div>
</div>
