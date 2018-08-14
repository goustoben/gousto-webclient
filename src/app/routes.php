<?php

/*
|--------------------------------------------------------------------------
| Application routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//do csrf token check for any route which is not checkout or age-verified
Route::whenRegex('/^(?!(\/)?(checkout|user\/public-age-verified)).*$/', 'csrf', ['post']);
Route::when('*', 'csrf-header', ['post', 'delete']);

// Homepage routes
Route::get('/', ['as' => 'homepage', 'uses' => 'HomeController@index']);
Route::get('/mary-berry', function () {
    return Redirect::to('/', 301);
});
// End Homepage routes

// new menu routes
Route::get('menu/{orderId?}', ['as' => 'menu', 'do' => function ($orderId = '') {
    $url = 'menu';
    $url .= ($orderId) ? '/'. $orderId : '';
    $url .= (Input::query()) ? '?' . http_build_query(Input::query()) : '';
    return Redirect::to($url, 301);
}])->where(['orderId', '.*']);

Route::get('menu/{orderId?}', ['as' => 'this-weeks-recipes', 'do' => function ($orderId = '') {
    return Redirect::to("menu/$orderId", 301);
}]);
Route::get('menu/{orderId?}', ['as' => 'next-weeks-recipes', 'do' => function ($orderId = '') {
    return Redirect::to("menu/$orderId", 301);
}]);

Route::get('{which}-weeks-recipes/{orderId?}', ['do' => function ($which = 'this', $orderId = '') {
    return Redirect::route('menu', $orderId);
}])->where('which', 'this|next');

// end new menu routes

// Pricing/Promo routes
Route::get('/prices', 'OrderController@prices');
Route::get('/box-prices', ['uses' => 'BoxPricesController@index']);
Route::get('/promo/{code}', 'PromotionController@code');

Route::post('/promotion/setSession', ['as' => 'promotion.set-session', 'uses' => 'PromotionController@setCodeSession']);
Route::post('/order/preview', ['uses' => 'OrderController@preview']);
// Pricing/Promo routes

// Postcode / delivery day routes
Route::get('/postcode/{postcode}', 'PostcodeController@isValid');
Route::get('/postcode/deliverydays/{postcode}', 'PostcodeController@deliveryDays');

Route::get('delivery-day/{delivery_day_id}', 'MenuController@deliveryDay');
Route::get('delivery-day/{delivery_day_id}/stocks', [
    'as' => 'delivery-day.stock',
    'uses' => 'MenuController@deliveryDayStock'
]);
// End Postcode/delivery day routes


// Checkout routes

Route::post('/user/check-duplicate', 'UserController@checkDuplicate');
// Route to capture user data before completing checkout
Route::post('capture', 'ProspectController@capture');


// Cookbook routes
Route::get('/cookbook/sitemap.xml', function () {
    return File::get(public_path().'/sitemap-cookbook.xml');
});
// TODO individual recipe pages require an admin login to access
Route::get('/cookbook/{category}/{slug}', ['as' => 'recipe.page', 'uses' => 'RecipeController@recipePage']);
// TODO individual recipe pages require an admin login to access
Route::get('/cookbook/{gousto_reference}', ['as' => 'recipe.page.permalink', 'uses' => 'RecipeController@recipePagePermalink']);
Route::get('/cookbook/{url}', ['as' => 'recipe.page.url', 'uses' => 'RecipeController@recipePage']);
// End Cookbook routes


Route::get('contact-customer-care', ['uses' => 'UserController@customer_care']);
Route::post('/newsletter-subscriber', [
    'as' => 'newsletter.signup',
    'uses' => 'NewsletterSubscriberController@store'
]);
Route::get('help', ['as' => 'faqs', 'uses' => 'FaqCategoryController@display']);


// Public User routes
Route::any('/signup{fragment}', ['as' => 'user.signup', 'uses' => 'UserController@signup'])->where('fragment', '.*');
Route::post('checkout', ['as' => 'order.checkout', 'uses' => 'OrderController@checkout']);

Route::get('form-login', function () {
    return View::make('pages.login');
});
Route::get('login', function () {
    return Redirect::to('/#login', 301);
});
Route::get('resetform', function () {
    return View::make('pages.resetform');
});
Route::post('/reset', ['as' => 'resend-email', 'uses' => 'UserController@reset']);
Route::get('/newpasswordform', 'UserController@newpasswordform');
Route::post('/newpassword', 'UserController@newpassword');
Route::post('/setpassword/{id}', 'UserController@setpassword');
Route::post('/user/subscribe', 'UserController@subscribe');
Route::get('/user/validateEmail', 'UserController@isUniqueEmail');
Route::get('/logout', 'UserController@logout');
Route::post('/login', 'UserController@login');
Route::post('/user/create', 'UserController@create');
Route::get('reactivate-modal/{id}', function ($id) {
    return View::make('includes.reactivate-cancel-modal')->with('user_id', $id);
});
Route::get('refer/{user_name}/{code}', [
    'as' => 'refer-a-friend.landing',
    'uses' => 'CampaignController@referredFriend'
]);

// Restricted User routes
Route::group(['before' => 'require_login'], function () {
    // Account Pages

    // Old My Account page, redirects to My deliveries
    Route::get('my-account', ['as' => 'my-account', 'do' => function () {
        return Redirect::route('my-deliveries');
    }]);

    // My Deliveries routes
    Route::get('my-deliveries', ['as' => 'my-deliveries', 'uses' => 'UserController@deliveries']);
    Route::post('user/{user_id}/delivery/{delivery_day_id}/enable', ['as' => 'enable-projected-delivery', 'uses' => 'SubscriptionController@enableProjectedDelivery']);
    Route::post('user/{user_id}/delivery/{delivery_day_id}/disable', ['as' => 'disable-projected-delivery', 'uses' => 'SubscriptionController@disableProjectedDelivery']);
    Route::get('order/{order_id}/cancel', ['as' => 'order-cancel', 'uses' => 'OrderController@cancel']);
    Route::get('user/{user}/subscription/delivery/next', ['as' => 'subscription-delivery-next', function () {
        $html = View::make('pages.account.modals.skipped-all-modal')->render();
        return Response::json(['result' => 'ok', 'html' => $html]);
    }]);

    // Order routes - used on My Deliveries, and Order editing pages
    Route::get('/order/{id}', ['as' => 'order.show', 'before' => 'request-ajax', 'uses' => 'OrderController@show']);
    Route::post('/order/{id}/addProduct', ['before' => 'request-ajax', 'uses' => 'OrderController@addProduct']);
    Route::post('/order/{id}/removeProduct', ['before' => 'request-ajax', 'uses' => 'OrderController@removeProduct']);
    Route::post('/order/{id}/updateProducts', ['as' => 'order.update-products', 'before' => 'request-ajax', 'uses' => 'OrderController@updateProducts']);
    Route::post('/order/{order_id}/change-address/{address_id}', [
        'as' => 'order.change-address',
        'before' => 'request-ajax',
        'uses' => 'OrderController@changeAddress'
    ]);
    Route::get('user/{user_id}/order/{order_id}/address/build-partial', [
        'as' => 'user.order.address.render-address-box',
        'uses' => 'AddressController@buildOrderAddressBox'
    ]);
    Route::post('user/cancel-pending-orders', [
        'as' => 'user.cancel-pending-orders',
        'uses' => 'UserController@cancelAllPendingOrders'
    ]);
    // Order summary page
    Route::get('order/{order_id}/summary', ['as' => 'order.summary','uses' => 'OrderController@summary']);

    // My Subscription routes
    Route::get('my-subscription', ['as' => 'user-subscription.show', 'uses' => 'SubscriptionController@show']);
    Route::post('my-subscription', ['as' => 'user-subscription.update', 'uses' => 'SubscriptionController@update']);
    Route::post('my-subscription/cancel', ['as' => 'user-subscription.deactivate', 'uses' => 'SubscriptionController@deactivate']);
    Route::post('my-subscription/reactivate', ['as' => 'user-subscription.reactivate', 'uses' => 'SubscriptionController@activate']);
    Route::post('/user/{id}/subscription-on-hold', 'SubscriptionController@onHold');
    Route::get('/user/skip-xmas', ['as' => 'user.skip-xmas', 'uses' => 'SubscriptionController@skipChristmas']);

    Route::get('my-gousto', ['as' => 'my-gousto.show', 'uses' => 'UserController@myGousto']);

    // My Details routes
    Route::get('my-details', ['as' => 'user-details.show', 'uses' => 'UserController@show']);
    Route::post('my-details/name', ['as' => 'user-details.update-name', 'uses' => 'UserController@updateName']);
    Route::post('my-details/phone', ['as' => 'user-details.update-phone', 'uses' => 'UserController@updatePhone']);
    Route::post('my-details/email', ['as' => 'user-details.update-email', 'uses' => 'UserController@updateEmail']);
    Route::post('my-details/reset-password', ['as' => 'user-details.reset-email', 'uses' => 'UserController@resetPassword']);
    Route::post('/user/update/current', 'SubscriptionController@updateCurrentAccount');
    Route::delete('/user/{id}', ['as' => 'user-cancel', 'uses' => 'UserController@destroy']);
    Route::post('/user/{user_id}/address/{address_id}/set-default-shipping', [
        'as' => 'user.address.set-default-shipping',
        'uses' => 'UserController@setDefaultShippingAddress'
    ]);
    Route::post('/user/{user_id}/address/{address_id}/update', [
        'as' => 'user.address.update',
        'uses' => 'UserController@updateAddress'
    ]);
    Route::post('/user/{user_id}/address/', [
        'as' => 'user.address.store',
        'uses' => 'UserController@addAddress'
    ]);
    Route::post('/user/{user_id}/address/{address_id}/delete', [
        'as' => 'user.address.delete',
        'uses' => 'UserController@deleteAddress'
    ]);
    Route::get('/user/{user_id}/address/build-partial', [
        'as' => 'user.address.render-address-box',
        'uses' => 'AddressController@buildAddressBox'
    ]);

    Route::post('/user/{user_id}/payment-method', [
        'as' => 'user.payment-method.update',
        'uses' => 'UserController@paymentMethod'
    ]);

    Route::post('my-details/communication-preferences', [
        'as' => 'user-details.update-communication-preferences',
        'uses' => 'UserController@updateCommunicationPreferences'
    ]);

    // User Promotion routes
    Route::post('/user/{user_id}/applyPromotionCode', [
        'as' => 'user.promo.apply',
        'uses' => 'UserController@applyPromotionCode'
    ]);

    // User Age Verification route
    Route::post('user/age-verified', [
        'as' => 'user-details.update-age-verified',
        'uses' => 'UserController@updateAgeVerified'
    ]);

    // My Free Boxes routes
    Route::get('my-referrals', ['as' => 'my-referrals', 'uses' => 'UserController@referrals']);
    Route::post('/user/{id}/referral', ['uses' => 'UserController@referral']);

    // Rating Recipes
    Route::get('rate-my-recipes', ['as' => 'user.rate-my-recipes.show', 'uses' => 'UserController@showRecipeRatings']);
    Route::post('/order/{id}/rating/{recipe_id}', ['uses' => 'RatingController@store']);
    Route::get('/order/{id}/rating', ['uses' => 'RatingController@show']);

    // Wishlist
    Route::post('/user/{id}/wishlist/{recipe_id}', ['uses' => 'WishlistController@store']);
    Route::post('/user/{id}/wishlist-remove/{recipe_id}', ['uses' => 'WishlistController@destroy']);

    // User utility routes - for common ajax / info requests
    Route::get('/user/current', ['before' => 'request-ajax', 'uses' => 'UserController@current']);
    Route::get('/user/balance', 'UserController@balance');

    Route::get('billing-modal/{id}/{fn}/{msg}', function ($id, $fn, $msg) {
        return View::make('pages.account.modals.billing-modal-body', ['id'=>$id, 'fn' => $fn, 'msg' => $msg]);
    });

    Route::get('user/{id}/onhold-modal', ['as' => 'modal.onhold', 'uses' => 'UserController@onholdModal']);
});

// unsure what these routes do
Route::get('/periods/{only_free?}', 'PeriodController@index');


/* Value Pages */
Route::get('values', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('our-values', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('we-care', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('values/sustainable-food', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('sustainable-food', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('values/reduce-food-waste', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('reducing-food-waste', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('values/healthy-eating', function () {
    return Redirect::to('blog/values', 302);
});
Route::get('healthy-food', function () {
    return Redirect::to('blog/values', 302);
});

Route::get('values/high-quality-meat', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('values/vegetable-sourcing', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('values/local-food', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('values/food-suppliers', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('our-suppliers', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('our-meat-and-poultry', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('our-vegetables', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('local-farming', function () {
    return Redirect::to('blog/suppliers', 302);
});
Route::get('suppliers', function () {
    return Redirect::to('blog/suppliers', 302);
});

/* End Value Pages */


Route::get('gousto-story', function () {
    return Redirect::to('/', 301);
});
Route::get('dragons-den', function () {
    return Redirect::to('/', 301);
});
Route::get('billing-modal/{id}/{fn}/{msg}', function ($id, $fn, $msg) {
    return View::make('pages.account.modals.billing-modal-body', ['id'=>$id, 'fn' => $fn, 'msg' => $msg]);
});
// temporarily 301 from press page to homepage
// Route::get('press', function() { return View::make('pages.press'); });
Route::get('press', function () {
    return Redirect::to('/', 301);
});
Route::get('delivery-information', function () {
    return Redirect::to('/learn-more', 301);
});

/* Legal Pages */
Route::get('privacy-statement', function () {
    return View::make('pages.legal.privacy-statement');
});
Route::get('terms-and-conditions', function () {
    return View::make('pages.legal.terms-and-conditions');
});
Route::get('terms-of-use', function () {
    return View::make('pages.legal.terms-of-use');
});
/* End Legal Pages */

Route::get('learn-more', function () {
    return Redirect::to('help', 301);
});
Route::get('contact', function () {
    return Redirect::to('help', 301);
});
Route::post('contact', 'ContactController@store');

Route::get('affiliates', function () {
    return View::make('pages.affiliates');
});
Route::get('blog-maintenance', function () {
    return View::make('pages.blog-maintenance');
});

Route::post('/enquiry/question', ['as' => 'enquiry.question', 'uses' => 'EnquiryController@question']);

Route::get('/subscription-cancelled', function () {
    return Redirect::to('/', 301);
});
Route::get('/reactivate/{token}', ['as' => 'one-click-reactivate-passthru', function ($token) {
    return View::make('pages.one-click-passthru')->with('token', $token);
}]);
Route::get('/user-reactivate/{token}', ['as' => 'one-click-reactivate', 'uses' => 'UserController@oneClickReactivate']);

// Public Age Verification route
Route::post('user/public-age-verified', [ 'as' => 'user-details.public-update-age-verified', 'uses' => 'UserController@publicUpdateAgeVerified' ]);

Route::post('/notifyInternal', ['uses' => 'RatingController@notify']);

/* Legacy Magento redirects */

Route::get('customer/choices', function () {
    return Redirect::to('my-account', 301);
});
Route::get('choices', function () {
    return Redirect::to('my-account', 301);
});
Route::get('faq', function () {
    return Redirect::to('help', 301);
});
Route::get('the-gousto-story', function () {
    return Redirect::to('/', 301);
});
Route::get('customer/account/forgotpassword', function () {
    return Redirect::to('resetform', 301);
});
Route::get('customer/account/login', function () {
    return Redirect::to('my-account', 301);
});
Route::get('customer/account', function () {
    return Redirect::to('my-account', 301);
});
Route::get('customer/account/edit', function () {
    return Redirect::to('my-account', 301);
});
Route::get('customer/address', function () {
    return Redirect::to('my-account', 301);
});
Route::get('subscriptions/customer', function () {
    return Redirect::to('my-account', 301);
});
Route::get('refer-a-friend', function () {
    return Redirect::to('my-account', 301);
});
Route::get('telegraph', function () {
    return Redirect::to('/', 301);
});
Route::get('landing', function () {
    return Redirect::to('/', 301);
});

/* Catch all route for promotional landing page generation */
Route::any('{all}', ['uses' => 'CampaignController@loadRoute'])->where('all', '.*');
