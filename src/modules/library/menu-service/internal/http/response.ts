export type MenuAPIResponseDataItem = {
    type: "menu";
    id: string;
    attributes: {
        name: string;
        core_menu_id: string;
        starts_at: string;
        ends_at: string;
        is_default: boolean;
        period: {
            core_period_id: string;
        };
        signup_default_day: unknown;
    };
    meta: {
        cfyLengthExperimentUserAllocationGroup: string;
        swapsExperimentUserAllocationGroup: string;
        recommender: {
            enabled: boolean;
            version: string;
            name: string;
            limit: number;
            tutorial: string;
        };
    };
    relationships: {
        boxes: {
            data: unknown[];
        };
        collections: {
            data: unknown[];
        };
        featured_categories: {
            data: unknown[];
        };
        recipes: {
            data: unknown[];
        };
        featured_recipe: {
            data: unknown;
        };
        debut_recipes: {
            data: unknown[];
        };
        recipe_options: {
            data: unknown[];
        };
    };
};

export type MenuAPIResponseIncludedItem =
    | { type: "box" }
    | { type: "collection" }
    | { type: "recipe" }
    | { type: "ingredient" };

/**
 * This represents the return shape of the /menus endpoint
 */
export type MenuAPIResponse = {
  result: {
    data: MenuAPIResponseDataItem[];
    included: MenuAPIResponseIncludedItem[];
    meta: {
        recommendations: {
            enabled: boolean;
            version: string;
            name: string;
            limit: number;
            tutorial: string;
        };
    };
  };
  status: "ok";
};

export type MenuAPIQueryData = {
    "preview[menu_id]"?: string;
    "preview[auth_user_id]"?: string;
    "preview[expiry]"?: string;
    "preview[signature]"?: string;
    "include"?: "ingredients";
    "addAlternatives"?: true;
    "tasteProfileId"?: string;
};
