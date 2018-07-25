<?php

class WishlistController extends BaseController
{
    public function store($id, $recipe_id)
    {
        $data = GoustoCore::create('user/'.$id.'/wishlist/'.$recipe_id);
        return Response::json(['status' => 'ok', 'event' => 'created', 'result' => ['data' => $data]]);
    }

    public function destroy($id, $recipe_id)
    {
        $data = GoustoCore::destroy('user/'.$id.'/wishlist/'.$recipe_id);
        return Response::json(['status' => 'ok', 'event' => 'deleted', 'result' => ['data' => $data]]);
    }
}
