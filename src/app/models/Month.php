<?php

namespace Gousto\Calendar;

use Illuminate\Support\Collection;
use Carbon\Carbon;

class Month extends CalendarModel
{
    protected $week = false;
    protected $end_of_month = false;

    public static function current()
    {
        $dt = Carbon::today();
        return new Month($dt->year, $dt->month);
    }

    public function getNameAttribute()
    {
        return $this->carbon()->format('F');
    }

    public function getYearAttribute()
    {
        return $this->year;
    }

    public function getFirstDayAttribute()
    {
        return new Day($this->year, $this->month, 1);
    }

    public function getLastDayAttribute()
    {
        return new Day($this->year, $this->month, $this->carbon()->lastOfMonth()->day);
    }

    public function getFirstDayOfWeekAttribute()
    {
        return $this->first_day->day_of_week;
    }

    public function getLastDayOfWeekAttribute()
    {
        return $this->last_day->day_of_week;
    }

    public function getFirstWeekPaddingAttribute()
    {
        $padding = new Collection;
        $last_month = $this->previous();
        $pad_day = $last_month->last_day;
        $pad_day->padding = true;
        $padding_needed = ($this->first_day_of_week === 0) ? 6 : $this->first_day_of_week - 1;
        for ($i = $padding_needed; $i > 0; $i--) {
            $padding->push($pad_day);
            $pad_day = $pad_day->previous(true);
        }
        return $padding->reverse();
    }

    public function getLastWeekPaddingAttribute()
    {
        $padding = new Collection;
        $next_month = $this->next();
        $pad_day = $next_month->first_day;
        $pad_day->padding = true;
        $padding_needed = ($this->last_day_of_week === 0) ? 6 : $this->last_day_of_week - 1;
        for ($i = $padding_needed; $i < 6; $i++) {
            $padding->push($pad_day);
            $pad_day = $pad_day->next(true);
        }
        return $padding;
    }

    public function weekNumber()
    {
        $day = $this->week->first();
        return $day->week_number;
    }

    public function next()
    {
        $carbon = $this->carbon()->addMonth();
        return new Month($carbon->year, $carbon->month);
    }

    public function previous()
    {
        $carbon = $this->carbon()->subMonth();
        return new Month($carbon->year, $carbon->month);
    }

    public function nextWeek()
    {
        if ($this->end_of_month === true) {
            return false;
        }
        $current_day = false;
        if ($this->week === false) {
            $this->week = $this->first_week_padding;
            $current_day = $this->first_day;
        } else {
            $current_day = $this->week->last()->next();
            $this->week = new Collection;
        }
        while (count($this->week) < 7) {
            $this->week->push($current_day);
            $current_day = $current_day->next();
            if ($current_day === false) {
                foreach ($this->last_week_padding as $day) {
                    $this->week->push($day);
                }
                $this->end_of_month = true;
            }
        }
        return $this->week;
    }
}
