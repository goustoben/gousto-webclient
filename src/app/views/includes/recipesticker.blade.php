@if(isset($sticker_width))
	<div id="itemgridchild-container" class="{{{ $sticker_width }}}">
@else
	<div class="col-sm-3 col-xs-6 no-delivery-tile">
@endif
		<div class="itemgridchild">
			@foreach($medias as $media)
				@if ($media['purpose']['slug'] === 'mood-image')
					<a href="{{{ URL::route('menu') }}}">
						<img src="{{{ $media['secure_cdn_url'] }}}"/>
					</a>
					<?php break; ?>
				@endif
			@endforeach
			<h5 class="text-center no-delivery-recipetitle">{{{ $recipe['title'] }}}</h5>
		</div>
	</div>

@if(!isset($no_modal) || !$no_modal)
	@include( 'includes/recipe-modal', array( 'recipe' => $recipe ) )
@endif
