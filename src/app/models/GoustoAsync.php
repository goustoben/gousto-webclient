<?php

class GoustoAsync implements IteratorAggregate
{
    protected $items = [];

    public function __construct($items = [])
    {
        $this->items = $items;
    }

    public function add($key, $route, array $params = [], Closure $onSuccess = null, Closure $onFailure = null)
    {
        $this->items[$key] = new GoustoCall($route, $params, $onSuccess, $onFailure);
    }

    public function get($key)
    {
        return $this->items[$key];
    }

    /**
     * Get an iterator for the items.
     *
     * @return \ArrayIterator
     */
    public function getIterator()
    {
        return new ArrayIterator($this->items);
    }
}
