<script>
	window.goustoManifest = window.goustoManifest || {};
</script>

<?php
$manifest_path = app_path().'/../public/rev-manifest.json';

if (file_exists($manifest_path)) {
?>
	<script>
	window.goustoManifest = JSON.parse({{ json_encode(file_get_contents($manifest_path), TRUE) }})
	</script>
<?php }
?>
