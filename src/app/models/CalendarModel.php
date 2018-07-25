<?php

namespace Gousto\Calendar;

use Carbon\Carbon;

class CalendarModel
{
    public $month;
    public $year;
    private $carbon;

    public function __construct($year, $month, $day = 1)
    {
        $this->month = $month;
        $this->year = $year;
        $this->carbon = Carbon::createFromDate($this->year, $this->month, $day);
    }

    /**
     * Get a new carbon instance using Carbon::copy
     * @return Carbon
     */
    public function carbon()
    {
        return $this->carbon->copy();
    }

    public function __get($attrib)
    {
        $getter = 'get' . ucwords(camel_case($attrib)) . 'Attribute';
        if (method_exists($this, $getter)) {
            return $this->$getter();
        }
        return $this->$attrib;
    }
}
