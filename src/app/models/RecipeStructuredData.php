<?php

class RecipeStructuredData
{
    

    /**
     * Returns the item from the array with the key specified
     * or, if the array doesn't exist or there's no item in the
     * given array with the given key then it returns the given
     * $default value.
     *
     * @param Array &$array
     * @param String $key
     * @param Variable $default
     * @return Variable
     */
    private function defaultValue($array, $key, $default)
    {
        if (isset($array) && array_key_exists($key, $array)) {
            return $array[$key];
        } else {
            return $default;
        }
    }

    /**
     * Returns the number from the array with the key specified,
     * rounded to 2 decimal places, or, if the array doesn't exist
     * or there's no item in the given array with the given key then
     * it returns the given $default value.
     *
     * @param Array &$array
     * @param String $key
     * @param Variable $default
     * @return Variable
     */
    private function ifsetRoundValue($array, $key, $default)
    {
        $number = $this->defaultValue($array, $key, null);
        if ($number) {
            return round($number, 2);
        } else {
            return $default;
        }
    }


    /**
     * Returns an Array in a Recipe Schema compliant format (https://schema.org/Recipe),
     * with the properties as requested in ticket https://gousto.atlassian.net/browse/TECH-1959
     * plus some recommended ones.
     * (You can test the output at https://search.google.com/structured-data/testing-tool)
     *
     * @param Array &$medias
     * @param Array &$recipe
     * @param Array &$recipe_steps
     * @return Array
     */
    public function generate($medias, $recipe, $recipe_steps)
    {
        if (isset($medias)) {
            $imageUrls = array_filter($medias, function ($media) {
                return $media['purpose']['slug'] === 'mood-image';
            });
            if (!empty($imageUrls)) {
                $imageUrls = array_values($imageUrls);
                $imageUrl = $imageUrls[0]['secure_cdn_url'];
            }
        }
        
        
        if (isset($recipe_steps) && array_key_exists('recipe_steps', $recipe_steps)) {
            $recipe_steps_serialised = array_map(function ($step) {
                if (array_key_exists('instruction', $step)) {
                    return strip_tags($step['instruction']);
                }
            }, $recipe_steps['recipe_steps']);

            $recipe_steps_serialised = array_filter($recipe_steps_serialised, function ($step) {
                return $step != '';
            });
        }

        $recipe_steps_serialised = isset($recipe_steps_serialised) ? $recipe_steps_serialised : null;

        if (isset($recipe) && array_key_exists('ingredients', $recipe) && array_key_exists('items', $recipe['ingredients'])) {
            $recipeIngredient = array_map(function ($item) {
                if (array_key_exists('name', $item)) {
                    return $item['name'];
                }
            }, $recipe['ingredients']['items']);
        } else {
            $recipeIngredient = null;
        }

        if (isset($recipe) && array_key_exists('nutritional_info', $recipe) &&
            array_key_exists('per_portion', $recipe['nutritional_info'])) {
            $portionNutrition = $recipe['nutritional_info']['per_portion'];
        } else {
            $portionNutrition = [];
        }
        
        if (array_key_exists('salt', $portionNutrition)) {
            /*
                according to USDA 1g of salt = 388mg of sodium:
                https://ndb.nal.usda.gov/ndb/foods/show/296?man=&lfacet=&count=&max=35&qlookup=02047&offset=&sort=&format=Abridged&reportfmt=other&rptfrm=&ndbno=&nutrient1=&nutrient2=&nutrient3=&subset=&totCount=&measureby=&_action_show=Apply+Changes&Qv=0.01&Q687=1&Q688=1&Q689=1&Q690=1
            */
            $sodiumContent = $portionNutrition['salt'] * 388;
        } else {
            $sodiumContent = null;
        }

        $name = $this->defaultValue($recipe, 'title', null);
        $author = $this->defaultValue($recipe, 'developer', "Gousto");
        $image = isset($imageUrl) ? $imageUrl : null;

        $marketing_description = $this->defaultValue($recipe, 'marketing_description', null);

        if (isset($recipe_steps['introduction'])) {
            $marketing_description = $recipe_steps['introduction'];
        }
        
        $recipeCategory = $this->defaultValue($recipe, 'cuisine', null);

        $recipe_prep_time = $this->defaultValue($recipe, 'preparation_time_minutes', null);

        if ($recipe_prep_time) {
            $recipe_prep_time = "PT".$recipe_prep_time."M";
        }

        $energy_kcal = $this->ifsetRoundValue($portionNutrition, 'energy_kcal', null);
        if ($energy_kcal) {
            $energy_kcal = $energy_kcal." calories";
        }

        $fatContent = $this->ifsetRoundValue($portionNutrition, 'fat', null);
        
        if ($sodiumContent) {
            $sodiumContent = round($sodiumContent, 2);
        }

        $carbs = $this->ifsetRoundValue($portionNutrition, 'carbs', null);
        $protein = $this->ifsetRoundValue($portionNutrition, 'protein', null);
        $fiberContent = $this->ifsetRoundValue($portionNutrition, 'fibre', null);
        $sugarContent = $this->ifsetRoundValue($portionNutrition, 'carbs_sugars', null);

        $ldjson = [
            "@context" => "http://schema.org/",
            "@type" => "Recipe",
            "name" => $name,
            "author" => [
                "@type" => "Person",
                "name" => $author
            ],
            "image" => $image,
            "description" => $marketing_description,
            "totalTime" => $recipe_prep_time,
            "recipeYield" => "2 or 4 servings",
            "recipeCategory" => $recipeCategory,
            "recipeIngredient" => $recipeIngredient,
            "recipeInstructions" => $recipe_steps_serialised,
            "nutrition" => [
                "@type" => "NutritionInformation",
                "calories" => $energy_kcal,
                "fatContent" => $fatContent,
                "sodiumContent" => $sodiumContent,
                "carbohydrateContent" => $carbs,
                "proteinContent" =>$protein,
                "fiberContent" => $fiberContent,
                "sugarContent" => $sugarContent
            ]
        ];

        return $ldjson;
    }
}
