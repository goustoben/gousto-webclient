<?php $domain = 'https://s3-eu-west-1.amazonaws.com/gousto2-media2/cms/homepage-image'; ?>
<?php $fallback = $domain . '/205.jpg'; ?>
<a href="/voucher-modal/{{{$campaign_slug}}}" id="voucherlink"  data-toggle="modal" data-target="#voucherModal"></a>
@if(isset($fallback))
<div class="flexslider">
	{{ image_tag($fallback,
		array("class" => "recipe-img", "lazy" => true, "alt" => "" )
	) }}
</div>
@endif
