# Gousto test bots

Gousto test bots are intended to be a drop in replacement for manual testers!
The tests can ask them to repeat small routines and then confirm the behaviour of the system. 

```JavaScript
const checkoutAccountPageSelectors = {
  dataTesting: {
    INFO_ORDER_SUMMARY: 'checkoutOrderSummary',
    INFO_TOTAL_PRICE: 'totalPrice'
  },
}

class CheckoutAccountBot extends GoustoTestBot {
  getCheckoutOrderSummary(opts) { return this.getByDataTestingName('INFO_ORDER_SUMMARY', opts) }

  getTotalPrice(opts) { return this.getByDataTestingName('INFO_TOTAL_PRICE', opts) }

  checkoutCompletesIn = (seconds) => {
    this.getCheckoutOrderSummary({ timeout: seconds * 1000 }).should('be.visible')
  }  

  confirmOrderSummaryIsVisible(opts) {
    this.getCheckoutOrderSummary(opts).should('be.visible')
  }

  confirmOrderPrice(value, opts) {
    this.getTotalPrice(opts).should(($el) => {
      expect($el).to.contain(value)
    })
  }
}

export const checkoutAccountBot = new CheckoutAccountBot(checkoutAccountPageSelectors)
```
## Why?

Gousto test bots are intended to help organise commands that:

* drive the user interface
* stub out api responses ready for controlled tests
* initiate an initial state ready for tests

### How they help

* hide and decouple implementation details of routines from the tests
* couple bot routines to user interfaces and allow for reuse so we benefit from a single routine implementation change in many tests
* add a defined API to interact with the web user interface that is both visible and easily discoverable and provides autocompletion in most IDEs

## The pattern used 
All Gousto test bots should inherit from the [GoustoTestBot](./gousto-test.bot.js) which implements some common methods that are available in all (sub class) test bots and gives them access to the [Gousto Fake API](../fixtures/api/gousto_fake_api.md)

```JavaScript
    class FooBot extends GoustoTestBot {}
```

They should be instantiated by passing in an Object Literal of selectors, with a `dataTesting` property that contains references to all `data-testing["{name}"]` within the ui domain that the bot interacts with:

```JavaScript

const fooSelectors = {
    dataTesting: {
        INPUT_BAR: 'bar',
        BUTTON_BAZ: 'baz'
    },
    info_quz: 'input[type="text"]'
}

export const fooBot = new FooBot(fooSelectors)

```

All bots should have getters which get each page element defined by their specified selectors, this tightly couples the implementation but keeps the selectors in a single place.

*The intention is to expose the selectors directly from the functional code, in the future, and have bots pull them in using a common convention. The advantage being that bots could easily auto-discover UI elements and only require a small amount of code to implement routines.* 

```JavaScript

 class FooBot extends GoustoTestBot {
     \\ ...

     getQuzInfo() { return cy.get(this.selectors.info_quz) }

     getBarInput() { return this.getByDataTestingName('INPUT_BAR')}

     getBazButton() { return this.getByDataTestingName('BUTTON_BAZ')}

    \\ ...
 }

```

Bots generally, do one of four things: 

## Initiate a state

```JavaScript
    ...
    initiateDeliveryPreferencesProvided(deliveryPrefs) {
        cy.window()
        .then(win => {
            const dispatch = win.__store__.dispatch

            dispatch({
                type: 'DELIVERY_PREFERENCES',
                deliveryPrefs
            })
        })
    }
    ...
```


## Prepare for tests

```JavaScript
    ...
    prepareForSelectionOfFourRecipes() {
        this.api.boxPrices.fakeOK()
        this.api.menu.v1.menus.fakeOK()
        this.api.brand.v1.theme.fakeOK()
        this.api.brand.v1["menu-headers"].fakeOK()
        this.api.prices.fakeOK()

        return () => {
            cy.wait('@GET:menu/v1/menus?*')
        }
    }
    ...
```


## Perform a routine

```JavaScript
...
    enterPostCode(postCode = MenuBot.DEFAULT_POSTCODE) {
        cy.log('Menu bot: Entering post code')
        this.getPostcodeInput().click().type(postCode)
        this.getSubmitPostCodeButton().click()
    }
...
```

## Confirm a behaviour

```JavaScript
 ...
    confirmNumberOfRecipeImagesVisible(num) {
        cy.log(`Menu bot: Expecting ${num} or more recipes to be visible`)
        this.getRecipeList()
        .find('img')
        .its('length')
        .should('be.gte', num - 1)
    }
 ...
```
