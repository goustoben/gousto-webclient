
type GetOptions = Partial<Loggable & Timeoutable & Withinable & Shadow>

interface GoustoTestBot {
    stubAllThirdParties(): void;
    confirmLocation(path: string): Chainable<Element>;
    dataTestingSelector(name: string): string;
    getByDataTestingAttribute(): Chainable<Element>;
    prepareForBrand(): void;
    prepareForLoggedOutUser(): void;
    getByDataTestingName(name: string, opts: GetOptions): Chainable<Element>;
}

interface MenuBot extends GoustoTestBot{
    visitMenu(): Chainable<Element>;
    selectNRecipes(position?: number[]): Chainable<Element>;
    getShowLoginButton(): Chainable<Element>;
    getRecipeList(): Chainable<Element>;
    getExpandSummaryButton(): Chainable<Element>;
    getPostcodeInput(): Chainable<Element>;
    getSubmitPostCodeButton(opts: GetOptions): Chainable<Element>;
    getBoxSummaryContinueButton(opts: GetOptions): Chainable<Element>;
    getVisibleRecipes(): Chainable<Element>;
    getVisibleAddRecipeButtons(): Chainable<Element>;
    getCheckoutButtons(): Chainable<Element>;
    addRecipe(position?: number): void;
    clickShowLoginButton(): Chainable<Element>;
    assertMenuIsVisible(): Chainable<Element>;
    assertNumberOfRecipeImagesVisible(num: number): Chainable<Element>;
    enterPostCode(postCode?: string): Chainable<Element>;
    enterDeliveryPreferences(postCode?: string): Chainable<Element>;
    checkout(): Chainable<Element>;
    prepareForSelectionOfFourRecipes(callback?: () => void): void;
    retire(): void;
}

interface LoginFormBot extends GoustoTestBot{
    getForm(): Chainable<Element>;
    prepareForAuthSuccess(): void;
    submitLoginForm(): Chainable<Element>;
    getEmailInput(): Chainable<Element>;
    getPasswordInput(): Chainable<Element>;
    getSubmitButton(): Chainable<Element>;
    getLogoutButton(): Chainable<Element>;
    enterLoginCredentials(email?: string, password?: string): Chainable<Element>;
    attemptLogin(email?: string, password?: string): Chainable<Element>;
    assertLogoutButtonIsVisible(): Chainable<Element>;
}

interface CheckoutAccountBot extends GoustoTestBot{
    checkoutCompletesIn(seconds: number): Chainable<Element>;
    getCheckoutOrderSummary(opts: GetOptions): Chainable<Element>;
    getTotalPrice(opts: void): Chainable<Element>;
    assertOrderSummaryIsVisible(opts: GetOptions): Chainable<Element>;
    assertOrderPrice(value: string, opts: GetOptions): Chainable<Element>;
} 
  