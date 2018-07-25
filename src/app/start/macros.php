<?php
/**
 * Create an telephone input field.
 *
 * @param  string  $name
 * @param  string  $value
 * @param  array   $options
 * @return string
 */
Form::macro('tel', function ($name, $value = null, $options = []) {
    return Form::input('tel', $name, $value, $options);
});
/**
 * Create an hidden input field.
 *
 * @param  string  $name
 * @param  string  $value
 * @param  array   $options
 * @return string
 */
Form::macro('hidden', function ($name, $value = null, $options = []) {
    return Form::input('hidden', $name, $value, $options);
});

/**
 * Create a checkbox field with a label wrapper
 * @param  string  $name
 * @param  string  $label
 * @param  mixed   $value
 * @param  boolean $checked
 * @param  array   $attributes
 * @return string
 */
Form::macro('checkboxField', function ($name, $label = null, $value = 1, $checked = null, $attributes = []) {
    $html  = '<label for="' . $name . '">';
    $html .= $label . ' ' . Form::checkbox($name, $value, $checked, $attributes);
    $html .= '</label>';
    return $html;
});

/**
 * Pass an array and a key, will check if the value exists in the array or returns null
 * @param  array $item
 * @param  string $key
 * @return mixed
 */
Form::macro('valueOrBlank', function ($item = [], $key = '') {
    $indexes = explode('.', $key);
    $index = array_shift($indexes);
    if (isset($item[$index])) {
        $item = $item[$index];
        if (empty($indexes)) {
            return $item;
        } else {
            return Form::valueOrBlank($item, implode('.', $indexes));
        }
    }
    return null;
});

/**
 * Generates a dropdown from a single dimension list held as an array
 * @param  string $name
 * @param  boolean $empty_first
 * @param  array $list
 * @param  string $value
 * @param  array $attributes
 * @return string
 */
Form::macro('listSelect', function ($name, $empty_first = false, $list = [], $value = null, $attributes = []) {
    $options = [];
    if ($empty_first) {
        $options = ['' => ''];
    }
    foreach ($list as $item) {
        $options[$item] = $item;
    }
    return Form::select($name, $options, $value, $attributes);
});

/**
 * Create a comma separated list from an array
 *
 * @param  string  $labelIndex
 * @param  array   $list
 * @return string
 */
HTML::macro('commaList', function ($labelIndex, $list = []) {
    $text = "";
    $count = count($list);
    foreach ($list as $item) {
        $text .= $item[$labelIndex];
        $count--;
        $text .= ($count) ? ', ' : '';
    }
    return $text;
});

/**
* Create a string formatted with given currency symbol and decimal delimiter
* @param float 		$amount
* @param string 	$symbol currency symbol
* @return string
*/
HTML::macro('currencyFormat', function ($amount, $symbol = '£') {
    return $symbol . money_format('%i', $amount);
});

/**
* Append the ordinal suffix to a given number
* @param float 		$num
* @return string
*/
HTML::macro('ordinal', function ($num) {
    if (!is_numeric($num)) {
        return null;
    };
    $ends = ['th','st','nd','rd','th','th','th','th','th','th'];
    if (($num % 100) >= 11 && ($num % 100) <= 13) {
        $abbrev = $num . 'th';
    } else {
        $abbrev = $num . $ends[$num % 10];
    }
    return $abbrev;
});

/**
* Generate a human friendly 12 hour time from time string
* @param string 	$time
* @return string
*/
HTML::macro('twelveHourTime', function ($time) {
    if (!strtotime($time)) {
        return null;
    };
    $t = Carbon\Carbon::parse($time)->addSecond();
    return $t->format('ga');
});

HTML::macro('dayName', function ($dotw) {
    $dotw = intval($dotw) % 7;
    $day_name = '';
    switch ($dotw) {
        case 1:
            $day_name = 'Monday';
            break;
        case 2:
            $day_name = 'Tuesday';
            break;
        case 3:
            $day_name = 'Wednesday';
            break;
        case 4:
            $day_name = 'Thursday';
            break;
        case 5:
            $day_name = 'Friday';
            break;
        case 6:
            $day_name = 'Saturday';
            break;
        default:
            $day_name = 'Sunday';
    }
    return $day_name;
});

HTML::macro('renderAddress', function ($address, $delimiter = ', ', $fields = []) {
    if (!is_array($address)) {
        return null;
    }

    if (empty($fields)) {
        $fields = [
            'companyname',
            'line1',
            'line2',
            'line3',
            'town',
            'county',
            'postcode'
        ];
    }

    $elements = [];
    foreach ($address as $key => $value) {
        if (empty($value)) {
            continue;
        }
        if (in_array($key, $fields)) {
            $elements[] = $value;
        }
    }

    return implode($elements, $delimiter);
});

HTML::macro('formatPhoneNumber', function ($phone, $country_code = null) {
    if (empty($country_code)) {
        return $phone;
    }

    if (intval($country_code) === 44) {
        return '0' . $phone;
    }

    return '+' . $country_code . ' ' . $phone;
});
