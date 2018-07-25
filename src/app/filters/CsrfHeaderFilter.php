<?php

class CsrfHeaderFilter
{
    public function filter($route, $request)
    {
        $url = $request->url();
        preg_match("/^https?:\/\/[^\/\?]+/", $url, $hostname);
        $hostname = $hostname[0];
        if ($origin = $request->header('origin')) {
            if ($origin !== $hostname) {
                throw new CsrfHeaderException("{$url} failed csrf origin header check, gave {$origin}");
            }
        } elseif ($referer = $request->header('referer')) {
            preg_match("/^https?:\/\/[^\/\?]+/", $referer, $matches);
            if (empty($matches) || $matches[0] !== $hostname) {
                throw new CsrfHeaderException("{$url} failed csrf referer header check, gave {$matches}");
            }
        } else {
            throw new CsrfHeaderException("{$url} did not send either referer or origin csrf headers");
        }
    }
}
