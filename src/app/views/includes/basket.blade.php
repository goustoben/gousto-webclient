<h5>Your choices</h5>
@foreach($basket['recipes'] as $recipe)
	<p>{{{ $recipe }}}</p>
@endforeach
You delivery day for <span className="strong">{{{ $basket['postcode'] }}}</span> is <span className="strong">TODO</span>.  You can modify your selection after purchase until <span className="strong">{{{ $basket['when_cutoff'] }}}</span>
