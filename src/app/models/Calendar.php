<?php

namespace Gousto\Calendar;

use Carbon\Carbon;

class Calendar
{
    const padding = 'padding';
    const unavailable = 'unavailable';
    const available = 'available';
    const delivery = 'delivery';

    protected $dows = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    protected $months_to_display = 3;

    protected $delivery_days;
    protected $delivery_slots;
    protected $month_counter = 0;
    protected $month;
    protected $day;

    public $earliest_delivery_date;
    public $next_delivery_date;
    public $interval;
    public $deliveries = [];

    public $delivery_day;


    /**
     * [__construct description]
     * @param array $data the collection of data used to create the calendar
     */
    public function __construct($data)
    {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }

    public function nextMonth()
    {
        $carbon = $this->_getCarbon($this->earliest_delivery_day);
        if ($this->month_counter < 1) {
            $this->month = new Month($carbon->year, $carbon->month);
        } elseif ($this->month_counter < $this->months_to_display) {
            $this->month = $this->month->next();
        } else {
            return false;
        }
        $this->month_counter++;
        return true;
    }

    public function deliveryDays($delivery_slot_id = false)
    {
        $days = [];
        if (!$delivery_slot_id) {
            $delivery_slot_id = $this->delivery_slot['id'];
        }
        foreach ($this->delivery_days as $day) {
            if ($day['delivery_slot_id'] == $delivery_slot_id) {
                $carbon = $this->_getCarbon($day);
                $days[$day['id']] = $carbon->format('d F, Y');
            }
        }
        return $days;
    }

    public function nextRegularDeliveryDay()
    {
        if ($day = $this->next_regular_delivery_day) {
            return $day['id'];
        }
        return null;
    }

    public function firstDelivery()
    {
        if (isset($this->deliveries[0])) {
            return $this->deliveries[0]->toDateString();
        }
        return $this->earliest_delivery_date->toDateString();
    }

    public function deliverySlots()
    {
        $delivery_slots = [];
        foreach ($this->delivery_slots as $slot) {
            $delivery_slots[$slot['id']] = $this->dows[$slot['default_day'] - 1];
        }
        return $delivery_slots;
    }

    public function isScheduledDay($day)
    {
        if ($this->next_regular_delivery_day) {
            $next_delivery_week = $this->_getCarbon($this->next_regular_delivery_day)->weekOfYear;
            $day_week = $day->week_number;
            if ($day_week >= $next_delivery_week
                && ($next_delivery_week - $day_week) % $this->interval === 0
                && $this->delivery_day == $day->day_of_week) {
                return true;
            }
        }
        return false;
    }

    public function dayType($day)
    {
        if ($day->padding) {
            return self::padding;
        }
        $matching_days = [];
        foreach ($this->delivery_days as $delivery_day) {
            $carbon = $this->_getCarbon($delivery_day);
            if ($carbon->toDateString() == $day->date_string) {
                $matching_days[] = $delivery_day;
            }
        }
        foreach ($matching_days as $matching_day) {
            if ($matching_day['delivery'] === true) {
                return $matching_day;
            }
        }
        if (!empty($matching_days)) {
            return $matching_days[0];
        }
        return self::unavailable;
    }

    public function renderDay($day, $dotw)
    {
        $classes = [];
        $params = [];
        $checked = false;
        $day_type = $this->dayType($day);
        $day_id = null;
        switch ($day_type) {
            case self::padding:
                $classes[] = 'padding';
                $params['disabled'] = true;
                break;
            case self::unavailable:
                $classes[] = 'unavailable';
                $params['disabled'] = true;
                break;
            default:
                $day_id = $day_type['id'];
                $classes[] = 'available';
                if ($this->isScheduledDay($day)) {
                    $classes[] = 'scheduled';
                }
                if ($day_type['delivery'] === true) {
                    $classes[] = 'delivery';
                    $checked = true;
                }
        }
        if (in_array($day->date_string, \Config::get('deliveries.all_slots', []))) {
            $classes[] = 'allslots';
        }
        $html = '<td class="' . implode(' ', $classes) .'" data-dotw="' . $dotw . '" data-date="' . $day->date_string . '" data-day="' . $day->day . '" data-month="' . $day->month . '" data-year="' . $day->year . '">';
        if ($day_id) {
            $html .= '<label for="deliveries[]">';
            $html .= \Form::checkbox('deliveries[]', $day_id, $checked, $params);
        } else {
            $html .= '<label">';
        }
        $html .= $day->day;
        $html .= '</label>';
        $html .= '</td>';
        return $html;
    }

    public function renderWeek()
    {
        $week = $this->month->nextWeek();
        if (!$week) {
            return false;
        }
        $unavailable_week_class = '';
        $carbon = $this->_getCarbon($this->earliest_delivery_day);
        $week_year = $this->month->year;
        // fix for the last week of december being the same week as the first week of January
        if ($this->month->weekNumber() == 1 && $this->month->month == 12) {
            $week_year++;
        }
        if ($carbon->weekOfYear > $this->month->weekNumber() && $carbon->year >= $week_year) {
            $unavailable_week_class = ' unavailable';
        }
        $html = '<tr data-week="' . ($this->month->weekNumber() + (($this->month->year-2014)*52)) . '" data-month="' . $this->month->month . '" data-year="' . $week_year . '" class="week week-' . $this->month->weekNumber() . $unavailable_week_class . '">';
        foreach ($week as $dotw => $day) {
            $html .= $this->renderDay($day, $dotw + 1);
        }
        $html .= '</tr>';
        return $html;
    }

    public function renderMonth()
    {
        $month = $this->month;
        $html  = '<p class="month-title">'. $month->name . '&nbsp;' . $month->year . '</p>';
        $html .= '<table class="calendar table" data-month="' . $month->month . '" data-year="' . $month->year . '">';
        $html .= '<thead>';
        $html .= '<tr>';
        foreach ($this->dows as $dow) {
            $html .= '<th><abbr title="' . $dow . '">' . substr($dow, 0, 1) . '</abbr></th>';
        }
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';
        $day = $month->first_day;
        while ($week = $this->renderWeek()) {
            $html .= $week;
        }
        $html .= '</tbody>';
        $html .= '</table>';
        return $html;
    }

    private function _getCarbon($day)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $day['date']);
    }
}
