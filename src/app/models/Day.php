<?php

namespace Gousto\Calendar;

use Carbon\Carbon;

class Day extends CalendarModel
{
    public $day;
    public $padding;

    public function __construct($year, $month, $day, $padding = false)
    {
        parent::__construct($year, $month, $day);
        $this->day = $day;
        $this->padding = $padding;
    }

    public function next($padding = false)
    {
        $next_day = $this->carbon()->addDay();
        if ($next_day->month == $this->month) {
            return new Day($this->year, $this->month, $next_day->day, $padding);
        }
        return false;
    }

    public function previous($padding = false)
    {
        $previous_day = $this->carbon()->subDay();
        if ($previous_day->month == $this->month) {
            return new Day($this->year, $this->month, $previous_day->day, $padding);
        }
        return false;
    }

    public function getDayOfWeekAttribute()
    {
        return $cdow = $this->carbon()->dayOfWeek;
    }

    public function getWeekNumberAttribute()
    {
        return $this->carbon()->format('W');
    }

    public function getIsStartOfWeekAttribute()
    {
        return ($this->day_of_week === 1);
    }

    public function getDateStringAttribute()
    {
        return $this->carbon()->toDateString();
    }

    public function before(Carbon $date)
    {
        return ($date > $this->carbon());
    }
}
