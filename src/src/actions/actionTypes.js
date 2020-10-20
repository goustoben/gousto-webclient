const actionTypes = {
  AFFILIATE_SOURCE_SET: 'AFFILIATE_SOURCE_SET',

  SET_FIRST_LOAD_OF_SESSION: 'SET_FIRST_LOAD_OF_SESSION',

  APP_BANNER_DISMISSED: 'APP_BANNER_DISMISSED',

  AUTH_PASSWORD_RESET: 'AUTH_PASSWORD_RESET',

  BASKET_ADDRESS_CHANGE: 'BASKET_ADDRESS_CHANGE',
  BASKET_CHOSEN_ADDRESS_CHANGE: 'BASKET_CHOSEN_ADDRESS_CHANGE',
  BASKET_CHECKED_OUT: 'BASKET_CHECKED_OUT', // DEPRECATED - snowplow only
  BASKET_CHECKOUT: 'BASKET_CHECKOUT',
  BASKET_CHECKOUT_CLICKED: 'BASKET_CHECKOUT_CLICKED',
  BASKET_ELIGIBLE_TRACK: 'BASKET_ELIGIBLE_TRACK',
  BASKET_CHECKOUT_PROCEED: 'BASKET_CHECKOUT_PROCEED',
  BASKET_CURRENT_MENU_ID_CHANGE: 'BASKET_CURRENT_MENU_ID_CHANGE',
  BASKET_DATE_CHANGE: 'BASKET_DATE_CHANGE',
  BASKET_SELECT_DELIVERY_SLOT: 'BASKET_SELECT_DELIVERY_SLOT',
  BASKET_DELIVERYDAY_CHANGE: 'BASKET_DELIVERYDAY_CHANGE',
  BASKET_GIFT_ADD: 'BASKET_GIFT_ADD',
  BASKET_ID_CHANGE: 'BASKET_ID_CHANGE',
  BASKET_LIMIT_REACHED: 'BASKET_LIMIT_REACHED',
  BASKET_NUM_PEOPLE_CHANGE: 'BASKET_NUM_PEOPLE_CHANGE',
  BASKET_NUM_PORTION_CHANGE: 'BASKET_NUM_PORTION_CHANGE',
  PORTION_SIZE_SELECTED_TRACKING: 'PORTION_SIZE_SELECTED_TRACKING',
  BOX_SIZE_CHANGED_TRACKING: 'BOX_SIZE_CHANGED_TRACKING',
  BASKET_ORDER_LOADED: 'BASKET_ORDER_LOADED',
  BASKET_ORDER_DETAILS_LOADED: 'BASKET_ORDER_DETAILS_LOADED',
  BASKET_POSTCODE_CHANGE: 'BASKET_POSTCODE_CHANGE',
  BASKET_SELECT_POSTCODE: 'BASKET_SELECT_POSTCODE',
  BASKET_POSTCODE_PENDING: 'BASKET_POSTCODE_PENDING',
  BASKET_PRODUCT_ADD: 'BASKET_PRODUCT_ADD',
  BASKET_PRODUCT_REMOVE: 'BASKET_PRODUCT_REMOVE',
  BASKET_PRODUCT_TRACKING: 'BASKET_PRODUCT_TRACKING',
  BASKET_PROMO_CODE_CHANGE: 'BASKET_PROMO_CODE_CHANGE',
  BASKET_PROMO_CODE_APPLIED_CHANGE: 'BASKET_PROMO_CODE_APPLIED_CHANGE',
  BASKET_PROMO_CODE_URL_CHANGE: 'BASKET_PROMO_CODE_URL_CHANGE',
  BASKET_RECIPES_INITIALISE: 'BASKET_RECIPES_INITIALISE',
  BASKET_RECIPE_ADD: 'BASKET_RECIPE_ADD',
  BASKET_RECIPE_REMOVE: 'BASKET_RECIPE_REMOVE',
  BASKET_RESET: 'BASKET_RESET',
  BASKET_SIGNUP_COLLECTION_RECEIVE: 'BASKET_SIGNUP_COLLECTION_RECEIVE',
  BASKET_SLOT_CHANGE: 'BASKET_SLOT_CHANGE',
  BASKET_TARIFF_CHANGE: 'BASKET_TARIFF_CHANGE',
  BASKET_PREVIEW_ORDER_CHANGE: 'BASKET_PREVIEW_ORDER_CHANGE',
  BASKET_SET_SUBSCRIPTION_OPTION: 'BASKET_SET_SUBSCRIPTION_OPTION',
  BASKET_NOT_VALID: 'BASKET_NOT_VALID',

  BRAND_DATA_RECEIVED: 'BRAND_DATA_RECEIVED',

  BROWSER_TYPE_CHANGE: 'BROWSER_TYPE_CHANGE',
  BROWSER_SET_USER_AGENT: 'BROWSER_SET_USER_AGENT',

  BOXSUMMARY_DELIVERY_DAYS_RECEIVE: 'BOXSUMMARY_DELIVERY_DAYS_RECEIVE',
  BOXSUMMARY_DELIVERY_DAYS_RECEIVE_ERROR: 'BOXSUMMARY_DELIVERY_DAYS_RECEIVE_ERROR',
  BOXSUMMARY_VISIBILITY_CHANGE: 'BOXSUMMARY_VISIBILITY_CHANGE',

  DELIVERY_DAY_DROPDOWN_OPEN: 'DELIVERY_DAY_DROPDOWN_OPEN',
  DELIVERY_DAY_DROPDOWN_CLOSED: 'DELIVERY_DAY_DROPDOWN_CLOSED',
  DELIVERY_SLOT_DROPDOWN_OPEN: 'DELIVERY_SLOT_DROPDOWN_OPEN',
  DELIVERY_DAY_SELECTION_EDITED: 'DELIVERY_DAY_SELECTION_EDITED',
  DELIVERY_SLOT_SELECTION_EDITED: 'DELIVERY_SLOT_SELECTION_EDITED',
  DELIVERY_PREFERENCE_MODAL_VIEWED: 'DELIVERY_PREFERENCE_MODAL_VIEWED',
  DELIVERY_PREFERENCE_SELECTED: 'DELIVERY_PREFERENCE_SELECTED',
  DELIVERY_PREFERENCE_MODAL_CLOSED: 'DELIVERY_PREFERENCE_MODAL_CLOSED',

  BASKET_STEPS_ORDER_RECEIVE: 'BASKET_STEPS_ORDER_RECEIVE',

  CHECKOUT_ORDER_PLACE_ATTEMPT: 'CHECKOUT_ORDER_PLACE_ATTEMPT',
  CHECKOUT_ORDER_PLACE_ATTEMPT_FAILED: 'CHECKOUT_ORDER_PLACE_ATTEMPT_FAILED',
  CHECKOUT_ORDER_PLACE_ATTEMPT_SUCCEEDED: 'CHECKOUT_ORDER_PLACE_ATTEMPT_SUCCEEDED',
  CHECKOUT_ORDER_PLACED: 'CHECKOUT_ORDER_PLACED',
  CHECKOUT_ORDER_FAILED: 'CHECKOUT_ORDER_FAILED',
  CHECKOUT_CARD_TOKENIZATION_SUCCEEDED: 'CHECKOUT_CARD_TOKENIZATION_SUCCEEDED',
  CHECKOUT_CARD_TOKENIZATION_FAILED: 'CHECKOUT_CARD_TOKENIZATION_FAILED',

  CHECKOUT_INTERVALS_RECEIVE: 'CHECKOUT_INTERVALS_RECEIVE',
  CHECKOUT_ADDRESSES_RECEIVE: 'CHECKOUT_ADDRESSES_RECEIVE',
  CHECKOUT_ERRORS_CLEAR: 'CHECKOUT_ERRORS_CLEAR',
  CHECKOUT_SIGNUP: 'CHECKOUT_SIGNUP',
  CHECKOUT_CARD_SUBMIT: 'CHECKOUT_CARD_SUBMIT',
  CHECKOUT_SIGNUP_SUCCESS: 'CHECKOUT_SIGNUP_SUCCESS',
  CHECKOUT_SUBSCRIPTION_CREATED: 'CHECKOUT_SUBSCRIPTION_CREATED',
  CHECKOUT_SIGNUP_LOGIN: 'CHECKOUT_SIGNUP_LOGIN',
  CHECKOUT_ERROR_DUPLICATE: 'CHECKOUT_ERROR_DUPLICATE',
  CHECKOUT_SET_GOUSTO_REF: 'CHECKOUT_SET_GOUSTO_REF',
  SIGNUP_TRACKING_STEP_CHANGE: 'SIGNUP_TRACKING_STEP_CHANGE',
  CARD_TOKENIZATION_FAILED: 'CARD_TOKENIZATION_FAILED',
  NETWORK_FAILURE: 'NETWORK_FAILURE',
  VALID_CARD_DETAILS_NOT_PROVIDED: 'VALID_CARD_DETAILS_NOT_PROVIDED',

  CHOOSE_PLAN_CONTINUE: 'CHOOSE_PLAN_CONTINUE',

  ERROR: 'ERROR',

  FEATURES_SET: 'FEATURES_SET',

  FILTERS_RESET: 'FILTERS_RESET',
  FILTERS_COLLECTION_CHANGE: 'FILTERS_COLLECTION_CHANGE',
  FILTERS_PRODUCT_CATEGORY: 'FILTERS_PRODUCT_CATEGORY',

  GET_HELP_ACCEPT_REFUND: 'GET_HELP_ACCEPT_REFUND',
  GET_HELP_APPLY_DELIVERY_COMPENSATION: 'GET_HELP_APPLY_DELIVERY_COMPENSATION',
  GET_HELP_CONTACT_CHANNEL_SELECT: 'GET_HELP_CONTACT_CHANNEL_SELECT',
  GET_HELP_FETCH_INGREDIENT_ISSUES: 'GET_HELP_FETCH_INGREDIENT_ISSUES',
  GET_HELP_INGREDIENT_ISSUES_SELECT: 'GET_HELP_INGREDIENT_ISSUES_SELECT',
  GET_HELP_LOAD_ORDERS_BY_ID: 'GET_HELP_LOAD_ORDERS_BY_ID',
  GET_HELP_ORDER_ISSUE_SELECT: 'GET_HELP_ORDER_ISSUE_SELECT',
  GET_HELP_RECIPES_RECEIVE: 'GET_HELP_RECIPES_RECEIVE',
  GET_HELP_STORE_ORDER_ID: 'GET_HELP_STORE_ORDER_ID',
  GET_HELP_STORE_INGREDIENT_ISSUE_REASONS: 'GET_HELP_STORE_INGREDIENT_ISSUE_REASONS',
  GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE: 'GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE',
  GET_HELP_STORE_SELECTED_INGREDIENTS: 'GET_HELP_STORE_SELECTED_INGREDIENTS',
  GET_HELP_VALIDATE_INGREDIENTS: 'GET_HELP_VALIDATE_INGREDIENTS',
  GET_HELP_VALIDATE_ORDER: 'GET_HELP_VALIDATE_ORDER',

  JOBS_RECEIVE: 'JOBS_RECEIVE',
  JOBS_DEPARTMENT_CHANGE: 'JOBS_DEPARTMENT_CHANGE',

  LOGIN_BUTTON_CLICKED: 'LOGIN_BUTTON_CLICKED',

  PROMO_RECEIVE: 'PROMO_RECEIVE',
  PROMO_GET: 'PROMO_GET',
  PROMO_SET: 'PROMO_SET',
  PROMO_APPLY: 'PROMO_APPLY',
  PROMO_AGE_VERIFY: 'PROMO_AGE_VERIFY',
  PROMO_MODAL_VISIBILITY_CHANGE: 'PROMO_MODAL_VISIBILITY_CHANGE',

  LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
  LOGIN_USER_PENDING: 'LOGIN_USER_PENDING',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',

  PRICING_REQUEST: 'PRICING_REQUEST',
  PRICING_PENDING: 'PRICING_PENDING',
  PRICING_SUCCESS: 'PRICING_SUCCESS',
  PRICING_FAILURE: 'PRICING_FAILURE',
  PRICING_RESET: 'PRICING_RESET',

  LOGIN_REFRESH_REQUEST: 'LOGIN_REFRESH_REQUEST',
  LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST',
  LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
  LOGIN_REMEMBER_ME: 'LOGIN_REMEMBER_ME',
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_VISIBILITY_CHANGE: 'LOGIN_VISIBILITY_CHANGE',
  HELP_PRELOGIN_VISIBILITY_CHANGE: 'HELP_PRELOGIN_VISIBILITY_CHANGE',
  CHANGE_RECAPTCHA: 'CHANGE_RECAPTCHA',

  MENU_BROWSE_CTA_VISIBILITY_CHANGE: 'MENU_BROWSE_CTA_VISIBILITY_CHANGE',
  MENU_BOX_PRICES_RECEIVE: 'MENU_BOX_PRICES_RECEIVE',
  MENU_BOX_PRICES_RECEIVE_PENDING: 'MENU_BOX_PRICES_RECEIVE_PENDING',
  MENU_CUTOFF_UNTIL_RECEIVE: 'MENU_CUTOFF_UNTIL_RECEIVE',
  MENU_COLLECTIONS_RECEIVE: 'MENU_COLLECTIONS_RECEIVE',
  MENU_COLLECTION_ID_RECEIVE: 'MENU_COLLECTION_ID_RECEIVE',
  MENU_FETCH_DATA: 'MENU_FETCH_DATA',
  MENU_RECIPE_STOCK_CHANGE: 'MENU_RECIPE_STOCK_CHANGE',
  MENU_RECIPE_STOCK_CLEAR: 'MENU_RECIPE_STOCK_CLEAR',
  MENU_RECIPE_STOCK_REPLACE: 'MENU_RECIPE_STOCK_REPLACE',
  MENU_RECIPE_VARIANT_SELECTED: 'MENU_RECIPE_VARIANT_SELECTED',
  MENU_CLEAR_SELECTED_RECIPE_VARIANTS: 'MENU_CLEAR_SELECTED_RECIPE_VARIANTS',
  MENU_RECIPE_DETAIL_VISIBILITY_CHANGE: 'MENU_RECIPE_DETAIL_VISIBILITY_CHANGE',
  MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED: 'MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED',
  MENU_RECIPES_RECEIVE_PENDING: 'MENU_RECIPES_RECEIVE_PENDING',
  MENU_FORCE_LOAD: 'MENU_FORCE_LOAD',
  MENU_FETCH_PARAMS: 'MENU_FETCH_PARAMS',
  MENU_LOAD_COMPLETE: 'MENU_LOAD_COMPLETE',
  MENU_COLLECTIONS_HEADERS_RECEIVED: 'MENU_COLLECTIONS_HEADERS_RECEIVED',
  MENU_SET_CALCULATED_TIME_TO_USABLE: 'MENU_SET_CALCULATED_TIME_TO_USABLE',
  MENU_SERVICE_DATA_RECEIVED: 'MENU_SERVICE_DATA_RECEIVED',
  MENU_PREFETCHED: 'MENU_PREFETCHED',
  MENU_SET_SIDES_MODAL_RECIPE: 'MENU_SET_SIDES_MODAL_RECIPE',
  MENU_CLEAR_SIDES_MODAL_RECIPE: 'MENU_CLEAR_SIDES_MODAL_RECIPE',
  MENU_SELECT_RECIPE_SIDE: 'MENU_SELECT_RECIPE_SIDE',
  MENU_UNSELECT_RECIPE_SIDE: 'MENU_UNSELECT_RECIPE_SIDE',
  MENU_SHOW_CATEGORIES_MODAL: 'MENU_SHOW_CATEGORIES_MODAL',
  MENU_HIDE_CATEGORIES_MODAL: 'MENU_HIDE_CATEGORIES_MODAL',
  MENU_CLICK_SHOW_ALL_RECIPES_FOOTER: 'MENU_CLICK_SHOW_ALL_RECIPES_FOOTER',
  MENU_CATEGORY_SHORTCUT_CLICKED: 'MENU_CATEGORY_SHORTCUT_CLICKED',
  MENU_CATEGORY_BUTTON_CLICKED: 'MENU_CATEGORY_BUTTON_CLICKED',
  MENU_LOADING_ERROR: 'MENU_LOADING_ERROR',
  MENU_TRACK_CATEGORY_SCROLL: 'MENU_TRACK_CATEGORY_SCROLL',

  MYDELIVERIES_ORDERS: 'MYDELIVERIES_ORDERS',

  COOKBOOK_RECIPES_RECEIVE: 'COOKBOOK_RECIPES_RECEIVE',

  COOKBOOK_LOAD_COLLECTION_SETS: 'COOKBOOK_LOAD_COLLECTION_SETS',
  COOKBOOK_LOAD_RECIPE_SETS: 'COOKBOOK_LOAD_RECIPE_SETS',
  COOKBOOK_RECEIVE_COLLECTIONS: 'COOKBOOK_RECEIVE_COLLECTIONS',
  COOKBOOK_RECEIVE_COLLECTION_RECIPES: 'COOKBOOK_RECEIVE_COLLECTION_RECIPES',
  COOKBOOK_RESET_RECIPE_SETS: 'COOKBOOK_RESET_RECIPE_SETS',

  COOKIE_POLICY_ACCEPTANCE_CHANGE: 'COOKIE_POLICY_ACCEPTANCE_CHANGE',

  COLLECTIONS_RECEIVE_COLLECTIONS: 'COLLECTIONS_RECEIVE_COLLECTIONS',

  NEWSLETTER_SIGNUP_ERROR: 'NEWSLETTER_SIGNUP_ERROR',
  NEWSLETTER_SIGNUP_PENDING: 'NEWSLETTER_SIGNUP_PENDING',
  NEWSLETTER_SIGNUP_SUCCESS: 'NEWSLETTER_SIGNUP_SUCCESS',

  UNSUBSCRIBED_USER: 'UNSUBSCRIBED_USER',

  ORDER_CONFIRMATION_EDITED_TRACKING: 'ORDER_CONFIRMATION_EDITED_TRACKING',

  ORDER_SAVE: 'ORDER_SAVE',
  ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE: 'ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE',
  ORDER_CANCEL: 'ORDER_CANCEL',
  ORDER_ADDRESS_CHANGE: 'ORDER_ADDRESS_CHANGE',
  PROJECTED_ORDER_CANCEL: 'PROJECTED_ORDER_CANCEL',
  PROJECTED_ORDER_RESTORE: 'PROJECTED_ORDER_RESTORE',
  ORDER_DELIVERY_DAYS_RECEIVE: 'ORDER_DELIVERY_DAYS_RECEIVE',
  ORDER_UPDATE_DELIVERY_DAY_AND_SLOT: 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT',
  CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE: 'CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE',
  ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
  ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE: 'ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE',
  ORDER_SKIP_RECOVERY_TRIGGERED: 'ORDER_SKIP_RECOVERY_TRIGGERED',
  ORDER_UPDATE_PRODUCTS: 'ORDER_UPDATE_PRODUCTS',
  ORDER_HAS_ANY_PRODUCTS: 'ORDER_HAS_ANY_PRODUCTS',
  ORDER_CHECKOUT: 'ORDER_CHECKOUT',
  ORDER_CREATE_TRANSACTIONAL: 'ORDER_CREATE_TRANSACTIONAL',
  ORDER_RECIPES_CHOSEN: 'ORDER_RECIPES_CHOSEN',

  PAGE_CHANGED: 'PAGE_CHANGED',

  PENDING: 'PENDING',

  PRODUCT_CATEGORIES_RECEIVE: 'PRODUCT_CATEGORIES_RECEIVE',
  PRODUCT_DETAIL_VISIBILITY_CHANGE: 'PRODUCT_DETAIL_VISIBILITY_CHANGE',
  PRODUCTS_RECEIVE: 'PRODUCTS_RECEIVE',
  PRODUCTS_RANDOM_RECEIVE: 'PRODUCTS_RANDOM_RECEIVE',
  PRODUCTS_STOCK_CHANGE: 'PRODUCTS_STOCK_CHANGE',
  PRODUCTS_FILTER_TRACKING: 'PRODUCTS_FILTER_TRACKING',

  PERSIST_SIMPLE_HEADER: 'PERSIST_SIMPLE_HEADER',

  PS_SUBSCRIPTION_PAUSE_ATTEMPT: 'PS_SUBSCRIPTION_PAUSE_ATTEMPT',
  PS_START_MODAL_VIEWED: 'PS_START_MODAL_VIEWED',
  PS_REASON_CATEGORY_MODAL_VIEWED: 'PS_REASON_CATEGORY_MODAL_VIEWED',
  PS_REASON_CATEGORY_SELECTED: 'PS_REASON_CATEGORY_SELECTED',
  PS_REASON_LIST_MODAL_VIEWED: 'PS_REASON_LIST_MODAL_VIEWED',
  PS_REASON_SELECTED: 'PS_REASON_SELECTED',
  PS_RECOVERY_ATTEMPT_MODAL_VIEWED: 'PS_RECOVERY_ATTEMPT_MODAL_VIEWED',
  PS_SUBSCRIPTION_KEPT_ACTIVE: 'PS_SUBSCRIPTION_KEPT_ACTIVE',
  PS_SUBSCRIPTION_PAUSED: 'PS_SUBSCRIPTION_PAUSED',
  PS_END_MODAL_VIEWED: 'PS_END_MODAL_VIEWED',

  RECIPE_ADDED: 'RECIPE_ADDED',
  RECIPE_REMOVED: 'RECIPE_REMOVED',
  RECIPES_RECEIVE: 'RECIPES_RECEIVE',
  RECIPES_PERIOD_STOCK_RECEIVE: 'RECIPES_PERIOD_STOCK_RECEIVE',
  RECIPES_DISPLAYED_ORDER_TRACKING: 'RECIPES_DISPLAYED_ORDER_TRACKING',
  RECIPE_COLLECTION_SELECTED: 'RECIPE_COLLECTION_SELECTED',

  CONTENT_RECEIVE: 'CONTENT_RECEIVE',
  CONTENT_VARIANTS_RECEIVE: 'CONTENT_VARIANTS_RECEIVE',

  SERVER_REDIRECT: 'SERVER_REDIRECT',
  SERVER_REPLACE: 'SERVER_REPLACE',
  SIGNUP_STEPS_RECEIVE: 'SIGNUP_STEPS_RECEIVE',
  SIGNUP_COOK_FOR_KIDS: 'SIGNUP_COOK_FOR_KIDS',
  SIGNUP_STEP_SET: 'SIGNUP_STEP_SET',
  SIGNUP_TRACKING: 'SIGNUP_TRACKING',

  SUBSCRIPTION_LOAD_DATA: 'SUBSCRIPTION_LOAD_DATA',
  SUBSCRIPTION_PAUSE_CANCEL_ORDERS: 'SUBSCRIPTION_PAUSE_CANCEL_ORDERS',
  SUBSCRIPTION_PAUSE_PROMO_APPLY: 'SUBSCRIPTION_PAUSE_PROMO_APPLY',
  SUBSCRIPTION_PAUSE_SKIP_BOX: 'SUBSCRIPTION_PAUSE_SKIP_BOX',
  SUBSCRIPTION_PAUSE_REASON_CHOICE: 'SUBSCRIPTION_PAUSE_REASON_CHOICE',
  SUBSCRIPTION_PAUSE_REASON_GO_BACK: 'SUBSCRIPTION_PAUSE_REASON_GO_BACK',
  SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS: 'SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS',
  SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN: 'SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN',
  SUBSCRIPTION_PAUSE_REASON_LOAD_STEP: 'SUBSCRIPTION_PAUSE_REASON_LOAD_STEP',
  SUBSCRIPTION_PAUSE_REASON_RESET: 'SUBSCRIPTION_PAUSE_REASON_RESET',
  SUBSCRIPTION_PAUSE_REASON_SUBMIT: 'SUBSCRIPTION_PAUSE_REASON_SUBMIT',
  SUBSCRIPTION_PAUSE_REASONS_RECEIVE: 'SUBSCRIPTION_PAUSE_REASONS_RECEIVE',
  SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED: 'SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED',
  SUBSCRIPTION_PAUSE_ERROR: 'SUBSCRIPTION_PAUSE_ERROR',
  SUBSCRIPTION_PAUSE_FETCH: 'SUBSCRIPTION_PAUSE_FETCH',
  SUBSCRIPTION_PAUSE_START: 'SUBSCRIPTION_PAUSE_START',
  SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE: 'SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE',
  SUBSCRIPTION_DEACTIVATE: 'SUBSCRIPTION_DEACTIVATE',

  SET_TUTORIAL_VISIBLE: 'SET_TUTORIAL_VISIBLE',
  SET_TUTORIAL_VIEWED: 'SET_TUTORIAL_VIEWED',
  INCREMENT_TUTORIAL_VIEWED: 'INCREMENT_TUTORIAL_VIEWED',
  TUTORIAL_TRACKING: 'TUTORIAL_TRACKING',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  USER_IDENTIFIED: 'USER_IDENTIFIED',
  USER_AUTHENTICATED: 'USER_AUTHENTICATED',
  USER_REMEMBER_ME: 'USER_REMEMBER_ME',

  USER_AGE_VERIFY: 'USER_AGE_VERIFY',
  USER_CREDIT: 'USER_CREDIT',
  USER_CLEAR_DATA: 'USER_CLEAR_DATA',
  USER_LOAD_DATA: 'USER_LOAD_DATA',
  USER_LOAD_ORDER: 'USER_LOAD_ORDER',
  USER_LOAD_ORDERS: 'USER_LOAD_ORDERS',
  USER_LOAD_ORDERS_NEW: 'USER_LOAD_ORDERS_NEW',
  USER_LOAD_ORDER_TRACKING: 'USER_LOAD_ORDER_TRACKING',
  USER_LOAD_PROJECTED_DELIVERIES: 'USER_LOAD_PROJECTED_DELIVERIES',
  USER_LOAD_REFERRAL_DETAILS: 'USER_LOAD_REFERRAL_DETAILS',
  USER_LOAD_REFERRAL_OFFER: 'USER_LOAD_REFERRAL_OFFER',
  REFER_FRIEND_SHARE_SHEET_OPENED: 'REFER_FRIEND_SHARE_SHEET_OPENED',
  REFER_FRIEND_SHARE_SHEET_CLOSED: 'REFER_FRIEND_SHARE_SHEET_CLOSED',
  REFER_FRIEND_LINK_COPIED: 'REFER_FRIEND_LINK_COPIED',
  REFER_FRIEND_LINK_SHARE: 'REFER_FRIEND_LINK_SHARE',
  REFER_FRIEND_LINK_SHARED: 'REFER_FRIEND_LINK_SHARED',
  USER_ORDER_CANCEL_NEXT: 'USER_ORDER_CANCEL_NEXT',
  USER_ORDER_CARD_OPEN_CLOSE: 'USER_ORDER_CARD_OPEN_CLOSE',
  USER_ORDER_EDIT_OPEN_CLOSE: 'USER_ORDER_EDIT_OPEN_CLOSE',
  USER_ORDER_SKIP_NEXT_PROJECTED: 'USER_ORDER_SKIP_NEXT_PROJECTED',
  USER_PROSPECT: 'USER_PROSPECT',
  USER_REACTIVATE: 'USER_REACTIVATE',
  USER_SUBSCRIBE: 'USER_SUBSCRIBE',
  USER_SHIPPING_ADDRESSES_ERROR: 'USER_SHIPPING_ADDRESSES_ERROR',
  USER_SHIPPING_ADDRESSES_PENDING: 'USER_SHIPPING_ADDRESSES_PENDING',
  USER_SHIPPING_ADDRESSES_RECEIVE: 'USER_SHIPPING_ADDRESSES_RECEIVE',
  USER_UNLOAD_ORDERS: 'USER_UNLOAD_ORDERS',
  USER_UNLOAD_PROJECTED_DELIVERIES: 'USER_UNLOAD_PROJECTED_DELIVERIES',
  USER_POST_PAYMENT_METHOD: 'USER_POST_PAYMENT_METHOD',
  EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE: 'EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE',
  USER_CARD_EXPIRED: 'USER_CARD_EXPIRED',
  USER_LOAD_ADDRESSES: 'USER_LOAD_ADDRESSES',
  USER_GET_REFERRAL_OFFER: 'USER_GET_REFERRAL_OFFER',
  NOTIFICATION_BANNER_CLICKED: 'NOTIFICATION_BANNER_CLICKED',

  PAYMENT_SHOW_MODAL: 'PAYMENT_SHOW_MODAL',
  PAYMENT_HIDE_MODAL: 'PAYMENT_HIDE_MODAL',
  PAYMENT_SET_CURRENT_PAYMENT_METHOD: 'PAYMENT_SET_CURRENT_PAYMENT_METHOD',

  USER_RATE_COUNT: 'USER_RATE_COUNT',

  TEMP: 'TEMP',

  TRACKING: 'TRACKING',
  TRACKING_CTA_TO_ALL_RECIPES_CLICKED: 'TRACKING_CTA_TO_ALL_RECIPES_CLICKED',

  TRACKING_UNAVAILABLE_RECIPE_LIST: 'TRACKING_UNAVAILABLE_RECIPE_LIST',
  TRACKING_UNDO_DELIVERY_OPTIONS_CHANGE: 'TRACKING_UNDO_DELIVERY_OPTIONS_CHANGE',
  TRACK_VARIANT_RECIPE_LIST_DISPLAY: 'TRACK_VARIANT_RECIPE_LIST_DISPLAY',

  VOID: 'VOID', // to be used when action type is required but there's no actual action to dispatch

  __REACT_ROUTER_LOCATION_CHANGE: '@@router/LOCATION_CHANGE', // React router,
  LOGGER_SET_UUID: 'LOGGER_SET_UUID',

  STORE_SIGNUP_RECAPTCHA_TOKEN: 'STORE_SIGNUP_RECAPTCHA_TOKEN',

  SET_UTM_SOURCE: 'SET_UTM_SOURCE',

  OPTIMIZELY_ROLLOUT_LOADING: 'OPTIMIZELY_ROLLOUT_LOADING',

  EXPERIMENTS_RECEIVED: 'EXPERIMENTS_RECEIVED',
  EXPERIMENTS_APPEND: 'EXPERIMENTS_APPEND',
  EXPERIMENTS_REMOVE: 'EXPERIMENTS_REMOVE',
  EXPERIMENTS_FETCHING: 'EXPERIMENTS_FETCHING',
  EXPERIMENTS_ASSIGNING_USER: 'EXPERIMENTS_ASSIGNING_USER',
  EXPERIMENTS_TRACK_USER_BUCKETING: 'EXPERIMENTS_TRACK_USER_BUCKETING',

  LOGGING_MANAGER_EVENT_SENT: 'LOGGING_MANAGER_EVENT_SENT',
  LOGGING_MANAGER_EVENT_PENDING: 'LOGGING_MANAGER_EVENT_PENDING',
  LOGGING_MANAGER_EVENT_ERROR: 'LOGGING_MANAGER_EVENT_ERROR',
}

export { actionTypes }
