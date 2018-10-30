import config from 'config/head/gAnalitics'

const envTrackingId = config[__ENV__] // eslint-disable-line no-underscore-dangle

function gAnalitics() {
  return (`<!-- Google Analytics -->
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
  ga('create', ${envTrackingId || config.staging}, 'auto'); 
  ga('require', 'ec');
  </script>
  <!-- End Google Analytics -->`)
}

export default gAnalitics
