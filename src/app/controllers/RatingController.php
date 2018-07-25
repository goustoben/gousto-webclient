<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class RatingController extends BaseController
{
    public function index()
    {
        return View::make('cms.pages.customers.ratings');
    }

    public function store($id, $recipe_id)
    {
        $data = GoustoCore::create('/order/{order_id}/rating', [
        'order_id' => $id,
        'rating_recipe_id_'.$recipe_id => Input::get('recipe-rating'),
        'comment_recipe_id_'.$recipe_id => Input::get('recipe-review'),
    ]);
        return Response::json($data);
    }

    public function show($id)
    {
        $data = GoustoCore::fetch(
            '/order/'.$id.'/rating',
            []
    );
        return Response::json($data);
    }

    public function notify()
    {
        $input = Input::only('type', 'recipes');

        $data = GoustoCore::create('/notifyInternal/current/'
            . $input['type'], ['recipes' => $input['recipes']]);

        return Response::json($data);
    }
}
