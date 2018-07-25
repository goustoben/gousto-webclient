<div class="mobile-hide">
	@include('includes.card-banner')
</div>

<?php $isJoinPage = (isset($simplePage) && $simplePage) || Cookie::get('from_join'); ?>

<div class="row-offcanvas page-wrapper" id="react-root">
	<?php
		$nodeserver_host = Config::get('nodeserver.host');
		$node_url = "http://$nodeserver_host/header";
		$node_url .= '?path=' . Request::path();
		if (isset($landingPagePath)) {
			$node_url .= '&landingPagePath=' . $landingPagePath;
		}

		if (Cookie::get('promo_code') && Cookie::get('promo_url')) {
			$node_url .= '&promo=' . Cookie::get('promo_url');
		}
		if (isset($simplePage) && $simplePage) {
			$node_url .= '&simple=true';
		}

		$access = Sentry::getAccessToken();
		$refresh = Sentry::getRefreshToken();
		$remember = Sentry::shouldRemember();

		$oauth_token = null;

		if(Sentry::hasAccessToken()) {
			$oauth_token = json_encode([ 'access_token' => $access ]);
		}

		$oauth_refresh = null;

		if (Sentry::hasRefreshToken()) {
			$oauth_refresh = json_encode([ 'refresh_token' => $refresh, 'remember_me' => boolval($remember) ]);
		}

		$cookies = Cookie::get();
		$cookies['v1_oauth_token'] = $oauth_token;
		$cookies['v1_oauth_refresh'] = $oauth_refresh;

		if($cookies) {
			$nodeHeader = NodeServer::fetch($node_url, 5000, $cookies);
		} else {
			$nodeHeader = NodeServer::fetch($node_url, 5000);
		}

		if (count($nodeHeader) > 0) {
			$newCookies = $nodeHeader[1];
			$nodeHeader = $nodeHeader[0];
			foreach ($newCookies as $cookie) {
				$name = $cookie->getName();
				$value = $cookie->getValue();
				$expire = $cookie->getExpires();
				$path = $cookie->getPath();
				$domain = $cookie->getDomain();
				setcookie($name, urldecode($value), $expire, $path, $domain, false, false);
			}
		}
	?>
	<div id="nodeHeader">
		{{ $nodeHeader }}
		{{ stylesheet_path('stylesheets/application.css') }}
	</div>
	<div class="row cmain{{{ ($isJoinPage) ? "-join" : '' }}}">
		<div class="desktop-hide">
			@include('includes.card-banner')
		</div>
		@if($modal = Session::get('modal', false))
			<div id="{{{ $modal['id'] }}}" data-remote="{{{ $modal['remote'] }}}"></div>
		@endif
		<div class="row container wrapper wrapper-min-h">
			<div id="loginModal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">&nbsp;</div>
				</div>
			</div>
			<div id="reactivate-cancellation-modal" class="modal fade gmodal" tabindex="-1" role="dialog" aria-labelledby="reactivate-cancellation-modal-label" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">&nbsp;</div>
				</div>
			</div>
