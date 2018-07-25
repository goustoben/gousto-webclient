<?php
/**
 * Used to get lists back from the Core.
 * These can be used for validation and html dropdowns.
 * Provides a simple caching mechanism so calls do not get
 * repeated too often.
 */
class Info
{

    /**
     * Adds an empty option to the top of the list
     * @param  array $data
     * @return array
     */
    public static function empty_placeholder_options($data)
    {
        return array_merge(
            ['' => ' '],
            $data
        );
    }

    /**
     * Makes the call the Core and sends to a formatter if requested
     * @param  string  $name   The name of the info model
     * @param  mixed   $format The name of the formatter function
     * @return mixed
     */
    public static function get($name, $format = false)
    {
        try {
            $result = self::cache($name);
            if (!$result) {
                $result = GoustoCore::fetch('info/' . $name);
                self::cache($name, $result);
            }
            if (is_callable($format)) {
                call_user_func_array($format, [&$result]);
                return $result;
            } elseif (function_exists($format)) {
                return self::$format($result);
            }
            return $result;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return [];
        }
    }

    /**
     * A simple cache mechanism using Laravel Caching
     * If no values are passed it will return what is stored in the cache
     * If values are passed will set the cache to these values
     * @param  string  $name   The name of the info model to be cached
     * @param  mixed   $values The values to be stored in the cache
     * @return mixed
     */
    public static function cache($name, $values = false)
    {
        $cache = Cache::get('info_' . $name, []);
        if ($values) {
            $cache = $values;
            // store item in cache for 30 minutes
            Cache::put('info_' . $name, $values, 30);
        } elseif (!empty($cache)) {
            return $cache;
        }
        return false;
    }
}
