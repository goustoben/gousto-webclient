type RecipeStockResponseItem = {
  recipe_id: number;
  period_id: number;
  family_number: number;
  number: number;
  committed: '0' | '1';
  slot_number: string;
}

export type StockAPIData = {
  [recipeId: string]: RecipeStockResponseItem;
}

/**
 * This represents the return shape of the stock endpoint
 */
export type StockAPIResponse = {
  result: {
    data: {
      [recipeId: string]: RecipeStockResponseItem;
    };
    meta: [];
  };
  status: 'ok';
}
