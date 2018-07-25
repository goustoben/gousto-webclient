@if(!empty($theme['badge_type']) && $theme['badge_type'] !== 'none' && !empty($recipe['themed']) && $recipe['themed'])
	<div class="theme-badge" data-recipe-id="{{{ $recipe['id'] }}}" data-bind="visible: hasEnoughStock({{{ $recipe['id'] }}})">
		@if($theme['badge_type'] === 'image' && !empty($theme['badge_media']))
			<img src="{{{ $theme['badge_media']['src'] }}}" title="{{{ $theme['badge_media']['title'] }}}" alt="{{{ $theme['badge_media']['description'] }}}"/>
		@elseif($theme['badge_type'] === 'text' && !empty($theme['badge_text']))
			<div class="stocklabel">{{{ $theme['badge_text'] }}}</div>
		@endif
	</div>
@endif
