const actionTypes = {
  GET_HELP_APPLY_DELIVERY_COMPENSATION: 'GET_HELP_APPLY_DELIVERY_COMPENSATION',
  GET_HELP_CREATE_COMPLAINT: 'GET_HELP_CREATE_COMPLAINT',
  GET_HELP_LOAD_SHIPPING_ADDRESSES: 'GET_HELP_LOAD_SHIPPING_ADDRESSES',
  GET_HELP_LOAD_ORDERS: 'GET_HELP_LOAD_ORDERS',
  GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS: 'GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS',
  GET_HELP_LOAD_REFUND_AMOUNT: 'GET_HELP_LOAD_REFUND_AMOUNT',
  GET_HELP_LOAD_TRACKING_URL: 'GET_HELP_LOAD_TRACKING_URL',
  GET_HELP_STORE_ORDER: 'GET_HELP_STORE_ORDER',
  GET_HELP_VALIDATE_DELIVERY: 'GET_HELP_VALIDATE_DELIVERY',
  GET_HELP_HAS_SEEN_REPETITIVE_ISSUES: 'GET_HELP_HAS_SEEN_REPETITIVE_ISSUES',
  GET_HELP_SET_SELECTED_RECIPE_CARDS: 'GET_HELP_SET_SELECTED_RECIPE_CARDS',
  TRACKING: 'TRACKING',
}

const trackingKeys = {
  clickContinueAsNewCustomer: 'help_login_modal_click_continue_new',
  clickGetHelpWithThisBox: 'click_get_help_with_this_box',
  continueToSsrClick: 'continue_to_ssr_click',
  helpMassIssueIngredientAlertDisplayed: 'ssr_ingredients_supply_issues_message_displayed',
  helpPreLoginModalDisplayed: 'help_login_modal_displayed',
  ssrClickDoneRefundAccepted: 'ssr_ingredients_done_click',
  ssrClickViewRecipe: 'ssr_click_view_recipe',
  ssrDeliveriesAcceptRefund: 'ssr_deliveries_accept_refund',
  ssrDeliveriesClickGetInTouch: 'ssr_deliveries_click_get_in_touch',
  ssrDeliveriesClickTrackMyBox: 'ssr_deliveries_click_track_my_box',
  ssrDeliveriesClickViewMyGousto: 'ssr_deliveries_click_view_my_gousto',
  ssrDeliveriesDeclineRefund: 'ssr_deliveries_decline_refund',
  ssrDeliveriesSelectCategory: 'ssr_deliveries_select_category',
  ssrDeselectIngredient: 'ssr_deselect_ingredient',
  ssrIngredientsAutoAcceptCheck: 'ssr_ingredients_auto_accept_check',
  ssrIngredientsClickGetInTouch: 'ssr_ingredients_click_get_in_touch',
  ssrIngredientsClickGoToMyGousto: 'ssr_ingredients_click_go_to_my_gousto',
  ssrIngredientsOpenRefundArticle: 'ssr_ingredients_open_refund_article',
  ssrIngredientsReasonsConfirmed: 'ssr_ingredients_reasons_confirmed',
  ssrPrintedRecipeCardsContinue: 'ssr_printed_recipe_cards_continue',
  ssrPrintedRecipeCardsClickRecipe: 'ssr_printed_recipe_cards_click_recipe',
  ssrPrintedRecipeCardsClickDone: 'ssr_printed_recipe_cards_click_done',
  ssrRecipesClickGetInTouch: 'ssr_recipes_click_get_in_touch',
  ssrPrintedRecipeCardsClickCookbook: 'ssr_printed_recipe_cards_click_cookbook',
  ssrSelectIngredient: 'ssr_select_ingredient',
  viewCreditClick: 'view_credit_click',
}

export {
  actionTypes,
  trackingKeys
}
