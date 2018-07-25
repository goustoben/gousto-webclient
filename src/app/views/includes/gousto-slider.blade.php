<?php
	$presenter = new GoustoPresenter($paginator);
?>

<?php if ($paginator->getLastPage() > 1): ?>
	<ul class="pagination pagination-lg pagination-slider">
		<?php echo $presenter->render(); ?>
	</ul>
<?php endif; ?>
