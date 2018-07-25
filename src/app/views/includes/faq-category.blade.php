@if($category['display'] === '1' && isset($category['faqs']) && count($category['faqs']) > 0)
	<div class="faq-category">
		<h4 class="faq-category-title">{{{ $category['title'] }}}</h4>
		@foreach($category['faqs'] as $faq)
			@if($faq['display'] === '1')
				<h5 class="faq-category-accordion">
					<span class="faq-plus">+</span>
					<span class="faq-minus">-</span>
					{{{ $faq['question'] }}}
				</h5>
				<div class="faq-category-content">
					{{ $faq['answer'] }}
				</div>
			@endif
		@endforeach
	</div>
@endif
