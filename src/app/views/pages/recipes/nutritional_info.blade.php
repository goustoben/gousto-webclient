@if(in_array('nutritional_info', Config::get('display')))
	@if(isset($recipe['nutritional_info']) && isset($recipe['nutritional_info']['100_grams'])  && isset($recipe['nutritional_info']['per_portion']))
		<div>
			<table class="table table-bordered table-condensed nutritional-info-table">
				<thead>
					<th class="key">Typical Values</th>
					<th>per 100g</th>
					<th>per serving</th>
				</thead>
				<tbody>
					<tr>
						<td class="key">Energy</td>
						<td>{{{ round($recipe['nutritional_info']['100_grams']['energy_kj']) }}} kJ<br/>{{{ round($recipe['nutritional_info']['100_grams']['energy_kcal']) }}} kcal</td>
						<td>{{{ round($recipe['nutritional_info']['per_portion']['energy_kj']) }}} kJ<br/>{{{ round($recipe['nutritional_info']['per_portion']['energy_kcal']) }}} kcal</td>
					</tr>
					<tr>
						<td class="key">Fat<br>of which saturates</td>
						<td>{{{ round($recipe['nutritional_info']['100_grams']['fat'], 1) }}} g<br/>{{{ round($recipe['nutritional_info']['100_grams']['fat_saturates'], 1) }}} g</td>
						<td>{{{ round($recipe['nutritional_info']['per_portion']['fat'], 1) }}} g<br/>{{{ round($recipe['nutritional_info']['per_portion']['fat_saturates'], 1) }}} g</td>
					</tr>
					<tr>
						<td class="key">Carbohydrate<br>of which sugars</td>
						<td>{{{ round($recipe['nutritional_info']['100_grams']['carbs'], 1) }}} g<br/>{{{ round($recipe['nutritional_info']['100_grams']['carbs_sugars'], 1) }}} g</td>
						<td>{{{ round($recipe['nutritional_info']['per_portion']['carbs'], 1) }}} g<br/>{{{ round($recipe['nutritional_info']['per_portion']['carbs_sugars'], 1) }}} g</td>
					</tr>
					<tr>
						<td class="key">Fibre</td>
						<td>{{{ round($recipe['nutritional_info']['100_grams']['fibre'], 1) }}} g</td>
						<td>{{{ round($recipe['nutritional_info']['per_portion']['fibre'], 1) }}} g</td>
					</tr>
					<tr>
						<td class="key">Protein</td>
						<td>{{{ round($recipe['nutritional_info']['100_grams']['protein'], 1) }}} g</td>
						<td>{{{ round($recipe['nutritional_info']['per_portion']['protein'], 1) }}} g</td>
					</tr>
					<tr>
						<td class="key">Salt</td>
						<td>{{{ round($recipe['nutritional_info']['100_grams']['salt'], 2) }}} g</td>
						<td>{{{ round($recipe['nutritional_info']['per_portion']['salt'], 2) }}} g</td>
					</tr>
				</tbody>
			</table>
		</div>
	@endif
@endif
