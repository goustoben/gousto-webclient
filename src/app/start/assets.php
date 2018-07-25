<?php
/**
 * @param  string  $filename
 * @return string
 */

function asset_path($filename)
{
    $manifest_path = app_path().'/../public/rev-manifest.json';

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);
    } else {
        $manifest = [];
    }

    if (array_key_exists($filename, $manifest)) {
        return $manifest[$filename];
    }

    return $filename;
}

function svg_path($filename, $className = '', $attributes = [])
{
    $sprite_path = '/'. asset_path('images/' . Config::get('assets.sprite_filename'));

    $attributes_str = '';
    foreach ($attributes as $key => $value) {
        $attributes_str .= $key . '="' . $value . '" ';
    }
    return
        '<svg ' . $attributes_str . 'class="' . $filename . ' ' . $className . '">
			<use xlink:href="'. $sprite_path . '#' . $filename . '"></use>
		</svg>';
}

function image_tag($filename, $options, $responsiveSizes = [])
{
    $id = (!empty($options['id']) ? 'id="' . $options['id'] . '"' : '');
    $class = (!empty($options['class']) ? 'class="' . $options['class'].'"' : '');
    $lazy = (!empty($options['lazy']) ? $options['lazy'] : false);
    $retina = (!empty($options['retina']) ? $options['retina'] : false);
    if ($lazy) {
        $class = (!empty($options['class']) ? 'class="lazyload ' . $options['class'] . '"' : 'class="lazyload"');
    } else {
        $class = (!empty($options['class']) ? 'class="' . $options['class'] .'"' : '');
    }
    $alt = (!empty($options['alt']) ? 'alt="' . $options['alt'] . '"' : '');
    $ret = '';

    $sources = '';
    $srcset = '';
    $sizes = '';
    if (!empty($responsiveSizes)) {
        $lastElement = end($responsiveSizes);
        foreach ($responsiveSizes as $maxWidth => $responsiveSizeUrl) {
            if (array_key_exists($maxWidth, $responsiveSizes)) {
                $sources .= '<source data-srcset="' . $responsiveSizeUrl . '" media="(max-width: '.$maxWidth.'px)" />';
                $srcset .= $responsiveSizeUrl . ' ' . $maxWidth . 'w' . (($lastElement == $responsiveSizeUrl) ? '' : ', ');
                $sizes = $maxWidth . 'w' . (($lastElement == $responsiveSizeUrl) ? '' : ', ');
            }
        }
    } else {
        $sources = '<source data-srcset="' . $filename . '" />';
        $srcset = $filename;
    }
    if ($lazy) {
        $ret = '
		<picture>
			<!--[if IE 9]><video style="display: none"><![endif]-->'
            . $sources .
            '<source data-srcset="' . $filename . '" />
			<!--[if IE 9]></video><![endif]-->
			<img src="'. image_path('images/icons/transparent-pixel.png'). '" sizes="'.$sizes.'" data-srcset="'. $srcset . '"'. $alt . ' ' . $class .' ' . $id . ' />
		</picture>
		';
    } else {
        $ret = '<img src="' . $filename . '"'. $id . ' ' . $class . ' ' . $alt .' />';
    }
    return $ret;
}


function image_path($filename)
{
    return Config::get('assets.base') . '/' . asset_path($filename);
}

function font_path($filename)
{
    return Config::get('assets.base') . '/' . asset_path($filename);
}

function javascript_path($filename)
{
    return '<script type="text/javascript" src="'. Config::get('assets.base') . '/' . asset_path($filename) . '"></script>';
}
function stylesheet_path($filename)
{
    return '<link href="'. Config::get('assets.base') . '/' . asset_path($filename) . '" rel="stylesheet" type="text/css">';
}
