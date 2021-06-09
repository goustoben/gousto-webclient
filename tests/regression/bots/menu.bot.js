import { GoustoTestBot } from "./gousto-test.bot"

const menuPageSelectors = {
  dataTesting: {
    BUTTON_ADD_RECIPE: 'menuRecipeAdd',
    BUTTON_BOX_SUMMARY_CONTINUE: 'boxSummaryContinueButton',
    BUTTON_BOX_SUMMARY: 'boxSummaryButton',
    BUTTON_EXPAND_SUMMARY: 'expandBoxSummaryButton',
    BUTTON_SHOW_LOGIN: 'loginButton',
    BUTTON_SUBMIT_POSTCODE: 'menuSubmitPostcode',
    INPUT_POSTCODE: 'menuPostcodeInput',
    RECIPE_LIST: 'menuRecipesList',
    RECIPE: 'menuRecipeViewDetails',
  },
}

class MenuBot extends GoustoTestBot {
  static DEFAULT_POSTCODE = 'RH1 1AA'
  
  visitMenu() { return  cy.visit('/menu') }

  getShowLoginButton() { return this.getByDataTestingName('BUTTON_SHOW_LOGIN') }

  getRecipeList() { return this.getByDataTestingName('RECIPE_LIST') }

  getExpandSummaryButton() { return this.getByDataTestingName('BUTTON_EXPAND_SUMMARY') }

  getPostcodeInput() { return this.getByDataTestingName('INPUT_POSTCODE') }

  getSubmitPostCodeButton(opts = { timeout: 10000 }) { return this.getByDataTestingName('BUTTON_SUBMIT_POSTCODE', opts) }

  getBoxSummaryContinueButton(opts = { timeout: 20000 }) { return this.getByDataTestingName('BUTTON_BOX_SUMMARY_CONTINUE', opts) }

  getVisibleRecipes() { return this.getByDataTestingName('RECIPE') }

  getVisibleAddRecipeButtons() { return this.getByDataTestingName('BUTTON_ADD_RECIPE') }

  getCheckoutButtons() { return this.getByDataTestingName('BUTTON_BOX_SUMMARY') }

  addRecipe(position) {
    this.getVisibleAddRecipeButtons().eq(position).click()
  }

  clickShowLoginButton() {
    this.getShowLoginButton().click()
  }

  assertMenuIsVisible() {
    cy.log(`Menu bot: Expecting menu to be visible`)
    this.getRecipeList().should('be.visible')
  }

  assertNumberOfRecipeImagesVisible(num) {
    cy.log(`Menu bot: Expecting ${num} or more recipes to be visible`)
    this.getRecipeList()
      .find('img')
      .its('length')
      .should('be.gte', num - 1)
  }

  enterPostCode(postCode = MenuBot.DEFAULT_POSTCODE) {
    cy.log('Menu bot: Entering post code')
    this.getPostcodeInput().click().type(postCode)
    this.getSubmitPostCodeButton().click()
  }

  enterDeliveryPreferences(postCode = MenuBot.DEFAULT_POSTCODE) {
    cy.log('Menu bot: Entering delivery preferences')
    this.getExpandSummaryButton().click()
    this.enterPostCode(postCode)
    this.getBoxSummaryContinueButton().click({force: true}) 
  }

  checkout() {
    return this.getCheckoutButtons().eq(1).click()
  }

  selectNRecipes(positions = [1, 2, 3, 4]) {
    cy.log(`Menu bot: Selecting ${positions.length} recipe${positions.length === 1? '': 's'}`)

    positions.forEach((pos) => this.addRecipe(pos))
    
    return this.checkout()
  }

   /**
   * Setup API stubs for various endpoints simulating for the selection of four recipes. 
   *
   * @memberof MenuBot
   */
  prepareForSelectionOfFourRecipes(callback = () => void(null)) {

    this.api.boxPrices.OK()
    this.api.menu.v1.menus.OK()
    this.api.brand.v1.theme.OK()
    this.api.brand.v1["menu-headers"].OK()
    this.api.deliveries["v1.0"].days.OK()
    this.api.delivery_day.$day.stock.OK()
    this.api.clientmetrics.v1.metric.OK()
    this.api.prices.OK()

    callback()
  }

  retire () {
    cy.log('Menu bot: sleeping')
  }
}

export const menuBot = new MenuBot(menuPageSelectors)
