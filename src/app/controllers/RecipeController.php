<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class RecipeController extends BaseController
{
    public function recipePagePermalink($gousto_reference)
    {
        try {
            $recipe = $this->coreProvider()->fetch("recipe/reference/{$gousto_reference}");
            if ((isset($recipe['is_published']) && $recipe['is_published']) || Session::has('administratortoken')) {
                return Redirect::to('/cookbook/' . $recipe['url']);
            }
            return Redirect::to('cookbook');
        } catch (GoustoCoreServiceErrorException $e) {
            return Redirect::to('/cookbook')->with('error', 'The recipe was not found.');
        }
    }

    public function recipePage($category, $slug)
    {
        $menu = $this->coreProvider()->fetch("period/current/menu");

        try {
            $recipe = $this->coreProvider()->fetch("recipe/slug/{$slug}", [
                'includes' => ['meals', 'ingredients', 'nutritional_info', 'ratings']
            ]);
            if (!Request::is('cookbook/' . $recipe['url'])) {
                return Redirect::to('cookbook/' . $recipe['url']);
            }
            if (!$recipe['is_published'] && !Session::has('administratortoken') && !Request::ajax()) {
                return Redirect::to('cookbook');
            }
        } catch (GoustoCoreServiceErrorException $e) {
            return Redirect::to('/cookbook')->with('error', 'The "'. $slug .'" recipe was not found.');
        }

        $ingredients = [];
        $meal = [];
        foreach ($recipe['meals'] as $meal_data) {
            if ($meal_data['num_portions'] === '2') {
                $meal = $meal_data;
            }
        }
        foreach ($meal['ingredients'] as $ingredient) {
            $ingredient['image_url'] = '';
            $media = GoustoCore::fetch("ingredient/{$ingredient['id']}/media");
            if (isset($media[0])) {
                $ingredient['media'] = $media[0];
            }
            $ingredient['label'] = ($ingredient['pivot']['label'] !== '') ?
                $ingredient['pivot']['label'] :
                intval($ingredient['pivot']['ingredient_count']) . ' ' . $ingredient['display_name'];
            $ingredients[] = $ingredient;
        }

        try {
            $recipe_steps = $this->coreProvider()->fetch("recipe/". $recipe['id'] ."/steps");
        } catch (GoustoCoreServiceErrorException $e) {
            $recipe_steps = [];
        }

        if (!empty($recipe_steps)) {
            try {
                $recipe_steps_img = $this->coreProvider()->fetch("recipe_card/". $recipe_steps['id'] ."/media");
            } catch (GoustoCoreServiceErrorException $e) {
                $recipe_steps_img = [];
            }
        }

        try {
            $user = GoustoCore::fetch('user/current');
        } catch (GoustoCoreServiceErrorException $e) {
            $user = [];
        }

        $structuredData = new RecipeStructuredData();
        $cookbook_url = URL::to('cookbook');
        if (strpos($cookbook_url, 'index.php') !== false) {
            $cookbook_url = str_replace('/index.php', '', $cookbook_url);
        }
        $canonical_url = $cookbook_url . '/' . $category . '/' . $slug;

        if (Request::ajax()) {
            $view = View::make(
                'pages.recipes.show',
                compact('recipe', 'menu', 'user', 'ingredients', 'recipe_steps', 'recipe_steps_img', 'structuredData', 'canonical_url')
            );
            $view = $view->render();
            return Response::json([
                'status' => 'ok',
                'data' => $view
            ]);
        } else {
            $view = View::make(
                'pages.recipe.show',
                compact('recipe', 'menu', 'user', 'ingredients', 'recipe_steps', 'recipe_steps_img', 'structuredData', 'canonical_url')
            );
            return $view;
        }
    }
}
