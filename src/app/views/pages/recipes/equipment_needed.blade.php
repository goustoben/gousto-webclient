@if(!empty($recipe['equipment_needed']))
	<div class="panel-heading">
		You Will Need
		<div class="panel-subheading">
			{{{ ucfirst(strtolower($recipe['equipment_needed'])) }}}</p>
		</div>
	</div>
@endif
