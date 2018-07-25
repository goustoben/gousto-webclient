	</div> <!-- /container -->
</div>

<!-- Bootstrap core JavaScript + required libraries
================================================== -->
{{ javascript_path("javascripts/legacy.js") }}
<script>
	Raven.config('https://7cb034eb2543495c82042ed1b26c2fd0@sentry.io/102781').install()
</script>
@include('includes.tracking')
@include('includes.changeurl')
