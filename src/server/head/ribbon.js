const RIBBON_ID = 'd1a255d7a65f493b8a755fcc11a23414'

export const ribbon = () => `<script type="text/javascript">
(function(r,i,bb,o,n) {
window.ribbon = function(){R._q.push(arguments)}
var R = window.ribbon; R.ribbonID = bb; R.env = o; R._q = [];
s=r.createElement('script');
s.async=!0;s.src=i+'?rid='+R.ribbonID;
f=r.getElementsByTagName('script')[0];
f.parentNode.insertBefore(s, f);
})(document, 'https://cdn.tryribbon.com/ribbon.js', '${RIBBON_ID}');
</script>`
