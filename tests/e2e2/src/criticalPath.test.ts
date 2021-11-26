import {WebDriverBrowser} from "./webDriver/webDriverBrowser";
import {Builder, WebDriver} from "selenium-webdriver";
import {elementLocatedByCss} from "./browser/elementDescriptor";

require('chromedriver')

jest.setTimeout(60 * 1000)

let driver: WebDriver
let browser: WebDriverBrowser;

beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    browser = new WebDriverBrowser(driver);
})

const website = {
    acceptCookiePolicyButton: elementLocatedByCss('*[data-testing="cookiePolicyBannerBtn"]'),
    dismissPromoButton: elementLocatedByCss('*[data-testing="promoModalButton"]'),
    homePage: {
        getStartedButton: elementLocatedByCss('*[data-testing="homepageHeroCTA"]')
    },
    signUpJourney: {
        chooseBoxSize: {
            chooseFirstBoxButton: elementLocatedByCss('*[data-testing^="signupBoxSize"][data-testing$="Portions"]')
        },
        providePostCode: {
            postCodeTextBox: elementLocatedByCss('*[data-testing="signupPostcodeInput"]'),
            continueButton: elementLocatedByCss('*[data-testing="signupPostcodeCTA"]')
        },
        selectDeliveryTime: {
            confirmButton: elementLocatedByCss('*[data-testing="signupDeliveryCTA"]')
        },
        readAboutGousto: {
            seeMenuButton: elementLocatedByCss('*[data-testing="sellThePropositionCTA"]')
        },
        chooseRecipes: {
            addFirstRecipeButton: elementLocatedByCss('*[data-testing="menuRecipeAdd"]', 0),
            addSecondRecipeButton: elementLocatedByCss('*[data-testing="menuRecipeAdd"]', 1),
            checkoutButton: elementLocatedByCss('[data-testing="box-summary-desktop-banner"] [data-testing="boxSummaryButton"]')
        }
    }
}

async function visitHomePage() {
    await browser.visit(process.env.WEBSITE_URL || 'http://frontend.gousto.local:8080');
    await browser.ifPresentClickAndWaitForDisappearanceOf(website.acceptCookiePolicyButton);
}

async function beginSignUp() {
    await browser.click(website.homePage.getStartedButton);
}

async function chooseABoxSize() {
    await browser.clickAndWaitForDisappearanceOf(website.dismissPromoButton);
    await browser.click(website.signUpJourney.chooseBoxSize.chooseFirstBoxButton);
}

async function provideAPostCode() {
    await browser.enterTextInto(website.signUpJourney.providePostCode.postCodeTextBox, 'RH4 1EW');
    await browser.click(website.signUpJourney.providePostCode.continueButton)
}

async function selectADeliveryTime() {
    await browser.click(website.signUpJourney.selectDeliveryTime.confirmButton)
    await browser.click(website.signUpJourney.readAboutGousto.seeMenuButton)
}

async function chooseRecipes() {
    await browser.click(website.signUpJourney.chooseRecipes.addFirstRecipeButton)
    await browser.click(website.signUpJourney.chooseRecipes.addSecondRecipeButton)
    await browser.click(website.signUpJourney.chooseRecipes.checkoutButton)
}

test('critical path journey', async () => {
    try {
        await visitHomePage();
        await beginSignUp();
        await chooseABoxSize();
        await provideAPostCode();
        await selectADeliveryTime();
        await chooseRecipes();
    } catch (e) {
        console.error(`Page source when exception thrown:\n\n${await driver.getPageSource()}`);
        throw e;
    }
})

afterAll(() => driver && driver.quit())
