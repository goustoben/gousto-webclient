<div class="col-sm-4 itemgridchild wishlist-{{{$recipe['id']}}}">
<h3>{{{ $recipe['title'] }}}</h3>

@foreach($recipe['media'] as $media)
	@if ($media['purpose']['slug'] === 'mood-image')
		<a href="#" data-toggle="modal" data-target="#recipeModal{{{$recipe['id']}}}"><img src="{{{ $media['secure_cdn_url'] }}}"/></a>
		<?php break; ?>
	@endif
@endforeach

{{ Form::open(array('url' => 'user/'.$user.'/wishlist-remove/'.$recipe['id'], 'method' => 'POST', 'name' => 'wishlist'.$recipe['id'], 'class' => 'rating wishlist')) }}
						{{ Form::hidden('recipe-id',$recipe['id'],array())}}
						{{ Form::submit('Remove', array('class' => 'gbtn-primary')) }}
{{ Form::close() }}

</div>
