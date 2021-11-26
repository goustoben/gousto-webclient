import {By, Condition, error, until, WebDriver, WebElement, WebElementCondition} from "selenium-webdriver";
import {ElementDescriptor} from "../browser/elementDescriptor";
import {Browser} from "../browser/browser";
import ElementNotInteractableError = error.ElementNotInteractableError;

export class WebDriverBrowser implements Browser {
    private _driver: WebDriver;

    constructor(driver: WebDriver) {
        this._driver = driver;
    }

    async visit(url: string) {
        await this._driver.get(url)
    }

    async click(elementDescriptor: ElementDescriptor) {
        await this._driver.wait(until.elementsLocated(WebDriverBrowser.getLocatorFor(elementDescriptor)));

        await this._driver.wait(async driver => {
            try {
                const webElements = await driver.findElements(WebDriverBrowser.getLocatorFor(elementDescriptor));
                const webElement = webElements[elementDescriptor.matchIndex];
                await driver.executeScript(`arguments[0].scrollIntoView({ block: "center" })`, webElement)
                await webElement.click();

                return true
            } catch (e) {
                if (e instanceof ElementNotInteractableError) {
                    return false
                }

                throw e
            }
        })
    }

    async clickAndWaitForDisappearanceOf(elementDescriptor: ElementDescriptor) {
        const webElement = await this._driver.wait(until.elementLocated(WebDriverBrowser.getLocatorFor(elementDescriptor)));
        await this.clickAndWaitForDisappearanceOfWebDriverElement(webElement);
    }

    async ifPresentClickAndWaitForDisappearanceOf(elementDescriptor: ElementDescriptor) {
        const webElements = await this._driver.findElements(WebDriverBrowser.getLocatorFor(elementDescriptor));

        if (webElements.length > 0) {
            const webElement = webElements[0];
            await this.clickAndWaitForDisappearanceOfWebDriverElement(webElement)
        }
    }

    async enterTextInto(elementDescriptor: ElementDescriptor, text: string) {
        const webElement = await this._driver.wait(until.elementLocated(WebDriverBrowser.getLocatorFor(elementDescriptor)));
        await webElement.clear()
        await webElement.sendKeys(text)
    }

    private async clickAndWaitForDisappearanceOfWebDriverElement(webElement: WebElement) {
        await webElement.click()
        await this._driver.wait(until.stalenessOf(webElement));
    }

    private static getLocatorFor(elementDescriptor: ElementDescriptor) {
        const type = elementDescriptor.locationType;

        switch (type) {
            case 'css':
                return By.css(elementDescriptor.location)
            default:
                throw new Error(`Unsupported element locator type "${type}"`)
        }
    }

    private fixSeleniumStackTrace(snippet) {
        const stack = new Error('start of stack trace wrapper').stack;
        try {
            return Promise.resolve(snippet()).catch(function (e) {
                e.stack = e.stack + '\n' + stack;
                throw e;
            });
        } catch (e) {
            e.stack = e.stack + '\n' + stack;
            throw e;
        }
    }
}
