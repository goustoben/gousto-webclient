@if($banner['show'])
	<div class="celeb-banner container mobile-hide">
		<a href="{{{ URL::to($banner['url']) }}}">
			{{ image_tag(image_path($banner['image']), array("alt" => $banner['recipe_title'])) }}
		</a>
		<p class="heading-title row">
			{{{ $banner['recipe_title'] }}} is available to order up until {{{ $banner['recipe_cutoff'] }}}
		</p>
	</div>
@endif
