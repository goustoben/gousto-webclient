<?php

class NodeServer
{
    public static function fetch($url, $timeout = 500, $cookies = null)
    {
        $client = new \GuzzleHttp\Client();
        $config = [
            'connect_timeout' => $timeout/1000,
            'http_errors' => true,
        ];

        if (!empty($cookies)) {
            $cookie_strs = [];
            foreach ($cookies as $name => $value) {
                $cookie_strs[] = $name . '=' . $value;
            }
            $cookie_str = implode('; ', $cookie_strs);
            $config['headers'] = [
                'Cookie' =>  $cookie_str
            ];
        }

        $res = null;

        try {
            $res = $client->request('GET', $url, $config);
        } catch (Exception $e) {
            \Log::error('Nodeserver Fetch error for URL: "' . $url);
            \Log::error($e);
            return [false];
        }

        if ($res) {
            return [
                $res->getBody(),
                array_map(function ($str) {
                    return \GuzzleHttp\Cookie\SetCookie::fromString($str);
                }, $res->getHeader('set-cookie')),
            ];
        }
    }
}
