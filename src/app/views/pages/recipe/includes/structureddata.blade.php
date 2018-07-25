@if (isset($medias) && isset($recipe) && isset($recipe_steps))
	<?php $ldjson = $structuredData->generate($medias, $recipe, $recipe_steps); ?>
	@if (isset($ldjson))
		<script type="application/ld+json">
			{{ json_encode($ldjson); }}
		</script>
	@endif
@endif
