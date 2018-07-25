<div class="modal fade gmodal" id="age-restriction-modal" tabindex="-1" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">Over 18?</h4>
			</div>
			<div id="original-body">
				<div class="modal-body">
					<p>To add this item to your order please confirm you are over 18.</p>
				</div>
				<div class="modal-footer">
					<button id="under-age-button" class="gbtn-secondary" type="button">No, I'm under 18</button>
					<button id="over-age-button" class="gbtn-primary ladda-button" type="button" data-action="{{{ URL::route('user-details.update-age-verified') }}}" data-style="slide-left">Yes, I'm over 18</button>
				</div>
			</div>
			<div id="sorry-body" class="hide-soft">
				<div class="modal-body">
					<p>Sorry, 18 is the minimum legal age required for wine purchases.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="gbtn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</div>

@include('includes/ajax-csrf')
