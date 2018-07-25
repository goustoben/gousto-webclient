<?php

class GoustoCall
{
    public $url;

    public function __construct($route, array $params = [], Closure $onSuccess = null, Closure $onFailure = null)
    {
        $this->route = $route;
        $this->parameters = $params;
        $this->onSuccess = $onSuccess;
        $this->onFailure = $onFailure;
    }

    public function success($result)
    {
        if (is_null($this->onSuccess)) {
            return $result;
        }
        return call_user_func($this->onSuccess, $result);
    }

    public function fail(Exception $exception)
    {
        if (is_null($this->onFailure)) {
            throw $exception;
        }
        return call_user_func($this->onFailure, $exception);
    }
}
