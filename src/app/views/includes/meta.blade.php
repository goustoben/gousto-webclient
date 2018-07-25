@if (!isset($meta))
  <?php $meta = Config::get('meta.main.home'); ?>
@endif
@section('title', $meta['title'])
@section('description', $meta['description'])
@section('keywords', $meta['keywords'])
@section('og-title', $meta['og-title'])
@section('og-image', $meta['og-image'])
@section('og-description', $meta['og-description'])
@section('twitter-image', $meta['twitter-image'])
@section('twitter-title', $meta['twitter-title'])
@section('twitter-description', $meta['twitter-description'])
