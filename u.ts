import { isNullOrUndefined } from 'util';
import * as http from "http";
import * as fs from "fs";
//import { DOMParser } from "xmldom"; 
//import { Helper } from "codeceptjs";
const Helper = require('@codeceptjs/helper')
const { I } = inject();
export class u extends Helper {

    /**
      * Accepts the active JavaScript native popup window, as created by window.alert|window.confirm|window.prompt.
      * Don't confuse popups with modal windows, as created by [various
      * libraries](http://jster.net/category/windows-modals-popups).
      */
    static async acceptPopup() {

        I.acceptPopup();
    }
    /**
      * Set the automatic popup response to Accept.
      * This must be set before a popup is triggered.
      *
      * ```js
      * I.amAcceptingPopups();
      * I.click('#triggerPopup');
      * I.acceptPopup();
      * ```
      */
    static async amAcceptingPopups() {

        I.amAcceptingPopups();
    }


    /**
     * Set the automatic popup response to Cancel/Dismiss.
     * This must be set before a popup is triggered.
     *
     * ```js
     * I.amCancellingPopups();
     * I.click('#triggerPopup');
     * I.cancelPopup();
     * ```
     * Set the automatic popup response to Cancel/Dismiss. This must be set before a popup is triggered.
     */
    static async amCancellingPopups() {
        I.amCancellingPopups();
    }

    /**
       * {{> amOnPage }}
       */
    static async amOnPage(url: string) {
        await I.amOnPage(url);
    }
    /**
      * {{> appendField }}
      *
      *
      * Appends text to a input field or textarea. Field is located by name, label, CSS or XPath
      * I.appendField('#myTextField', 'appended');
      */

    static async appendField(locator: string, text: string) {
        I.waitForVisible(locator);
        I.appendField(locator, text);
    }

    /**
     * Waits for an element to be visible. 
     * Element can be located by CSS or XPath.
     * ```js
     * z.attachFile('Avatar', 'data/avatar.jpg');
     * z.attachFile('form input[name=avatar]', 'data/avatar.jpg');
     * ```
     * @param {string} locator label|name|CSS|XPath|strict locator.
     * @param {string} filepath local file path relative to codecept.json config file
     */
    static async attachFile(locator: string, filepath: string) {
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.attachFile(locator, filepath);
            }
            else {
                await I.attachFile(locator, filepath);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.attachFile(locator, filepath);
                }
                else {
                    await I.attachFile(locator, filepath);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("attachFile : Error while uploading file to the element located by: " + locator);
            }
        }
    }
    /**
      * Dismisses the active JavaScript popup, as created by window.alert|window.confirm|window.prompt.
      */
    static async cancelPopup() {

        I.cancelPopup();
    }



    /**
         * Scrolls element into viewport, waits for that element to become visible & clickable. Also checks if element is already checked.
         * Then selects a checkbox or radio button.
         * 
         * The second parameter is a context (CSS or XPath locator) to narrow the search.
         * ```js
         * z.checkOption('#agree');
         * z.checkOption('I Agree to Terms and Conditions');
         * z.checkOption('agree', '//form');
         * ```
         * @param {string} locator checkbox located by label | name | CSS | XPath | strict locator.
         * @param {string} context optional element located by CSS | XPath | strict locator.
         */
    static async checkOption(locator: string, context?: string) {
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                await I.waitForClickable(locator);
                await I.dontSeeCheckboxIsChecked(locator);
            }

            if (!isNullOrUndefined(context)) {
                await I.checkOption(locator, context);

            }
            else {
                await I.checkOption(locator);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);
                    await I.waitForClickable(locator);
                    await I.dontSeeCheckboxIsChecked(locator);
                }

                if (!isNullOrUndefined(context)) {
                    await I.checkOption(locator, context);
                }
                else {
                    await I.checkOption(locator);
                }
                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("checkOption : Error while selecting element located by: " + locator);
            }
        }
    }


    /**
     * Clears a cookie by name,
     * if none provided clears all cookies.
     *
     * ```js
     * z.clearCookie();
     * z.clearCookie('test');
     * ```
     *
     * @param {string} (optional, `null` by default) cookie name
     * 
     */
    static async clearCookie(cookie?: string) {
        try {
            if (isNullOrUndefined(cookie)) {
                await I.clearCookie();
            }
            else {
                await I.clearCookie(cookie);
            }

        } catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            await this.generateLog(timestamp, error);
            throw new Error("clearCookie: Error while clearing a cookie by name");
        }
    }


    /**
     * Scrolls element into viewport, waits for that element to become visible & enabled, then clears field value.
     * Throws error if any of the action fails in two attempts.
     * ```js
     * z.clearField('Email');
     * z.clearField('user[email]');
     * z.clearField('#email');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     */
    static async clearField(locator: string) {
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                await I.waitForEnabled(locator);

                await I.clearField(locator);
            }
            else {
                await I.clearField(locator);
            }

        }
        catch (error) {
            try {

                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);
                    await I.waitForEnabled(locator);


                    await I.clearField(locator);
                }
                else {
                    await I.clearField(locator);
                }

                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("clearField : Error while clearing value in element located by : " + locator);

            }
        }
    }


    /**
     * Close current tab.
     * ```js
     * z.closeCurrentTab();
     * ```
     */
    static async closeCurrentTab() {
        await I.closeCurrentTab();
    }


    /**
   * Close all tabs except for the current one.
   * ```js
   * z.closeOtherTabs();
   * ```
   */
    static async closeOtherTabs() {
        await I.closeOtherTabs();
    }


    /**
     * Checks that a text is not present on a page, if optional context parameter given then searches for the invisibility of text on the locator element.
     * Use context parameter to narrow down the search.
     * Throws error if any of the action fails in two attempts.
     * ```js
     * z.dontSee('Login'); // assume we are already logged in.
     * z.dontSee('Login', '.nav'); // no login inside .nav element
     * ```
     * @param {string} text which is not present.
     * @param {string} context optional, element located by CSS|Xpath|strict locator in which to search for text.
     */
    static async dontSee(text: string, context?: string) {
        try {
            if (!isNullOrUndefined(context)) {
                await I.dontSee(text, context);
            }
            else {
                await I.dontSee(text);
            }
        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (!isNullOrUndefined(context)) {
                    await I.dontSee(text, context);
                }
                else {
                    await I.dontSee(text);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("dontSee : Error while checking invisibility of element by: " + text);
            }
        }
    }


    /**
     * Scrolls element into viewport, waits for that element to become visible.
     * Then Verifies that the specified checkbox is not checked.
     * 
     * ```js
     * z.dontSeeCheckboxIsChecked('#agree');
     * z.dontSeeCheckboxIsChecked('I agree to terms');
     * z.dontSeeCheckboxIsChecked('agree');
     * ```
     * @param {string} field  located by label|name|CSS|XPath|strict locator.
     */
    static async dontSeeCheckboxIsChecked(field: string) {
        try {
            if (field.startsWith("/") || field.startsWith(".") || field.startsWith("#") || field.startsWith("{") || field.startsWith("(")) {
                await I.waitForElement(field);
                await I.scrollIntoView(field, { behavior: "auto", block: "center", inline: "center" });
                await I.dontSeeCheckboxIsChecked(field);
            }

            else {
                await I.dontSeeCheckboxIsChecked(field);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (field.startsWith("/") || field.startsWith(".") || field.startsWith("#") || field.startsWith("{") || field.startsWith("(")) {
                    await I.waitForElement(field);
                    await I.scrollIntoView(field, { behavior: "auto", block: "center", inline: "center" });
                    await I.dontSeeCheckboxIsChecked(field);
                }

                else {
                    await I.dontSeeCheckboxIsChecked(field);
                }

                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("dontSeeCheckboxIsChecked : Error while verfiying checkbox is not checked: " + field);
            }
        }
    }
    /* 
   * Parameters
name <strin>g (opens new window)cookie name. [!] returns a promise which is synchronized internally by recorder
    
*
   * {{> dontSeeCookie }}
   */

    static async dontSeeCookie(cookieName: string) {
        I.dontSeeCookie('auth'); // no auth cookie
    }

    /**
      * {{> dontSeeCurrentUrlEquals }}
      * url string (opens new window)value to check. [!] returns a promise which is synchronized internally by recorder
      */

    static async dontSeeCurrentUrlEquals(url: string) {
        I.dontSeeCurrentUrlEquals(url); // no auth cookie
    }
    /*
    dontSeeElementInDOM
    Opposite to seeElementInDOM. Checks that element is not on page.
    
    I.dontSeeElementInDOM('.nav'); // checks that element is not on page visible or not
    #Parameters
    locator (string (opens new window)| object (opens new window)) located by CSS|XPath|Strict locator. [!] returns a promise which is synchronized internally by recorder
    */

    static async dontSeeElementInDOM(locator: string) {
        I.dontSeeElementInDOM(locator);
    }
    /*
    *
    Checks that current url does not contain a provided fragment.
    */
    static async dontSeeInCurrentUrl(verbOrfragmentofText: string) {
        I.dontSeeInCurrentUrl(verbOrfragmentofText);
    }
    /*
    *Parameters
    field (string (opens new window)| object (opens new window)) located by label|name|CSS|XPath|strict locator.
    value string (opens new window)value to check. [!] returns a promise which is synchronized internally by recorder
    Checks that value of input field or textarea doesn't equal to given value Opposite to seeInField
    */
    static async dontSeeInField(locator: string, value: string) {
        I.dontSeeInField(locator, value);
    }

    /*
    Checks that title does not contain text
    Parameters
text string (opens new window)value to check. [!] returns a promise which is synchronized internally by recorder

    */
    static async dontSeeInTitle(text: string) {
        I.dontSeeInTitle(text);
    }

    /**
     * Scrolls element into viewport, waits for that element to become visible & clickable, then performs double click action.
     * Throws error if any of the action fails in two attempts.
     * The second parameter is a context (CSS or XPath locator) to narrow the search.
     * ```js
     * z.doubleClick('Edit');
     * z.doubleClick('Edit', '.actions');
     * z.doubleClick({css: 'button.accept'});
     * z.doubleClick('.btn.edit');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {string} context (optional, null by default) element to search in CSS|XPath|Strict locator.
     */
    static async doubleClick(locator: string, context?: string) {
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                await I.waitForClickable(locator);
            }
            if (!isNullOrUndefined(context)) {
                await I.doubleClick(locator, context);
            }
            else {
                await I.doubleClick(locator);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);
                    await I.waitForClickable(locator);
                }
                if (!isNullOrUndefined(context)) {
                    await I.doubleClick(locator, context);
                }
                else {
                    await I.doubleClick(locator);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("doubleClick : Error while double clicking on element located by : " + locator);
            }
        }
    }

    /**
       * Scrolls element into viewport, waits for that element to become visible & clickable, then Drag an item to a destination element.
       * Throws error if any of the action fails in two attempts.
       * 
       * ```js
       * z.dragAndDrop('#dragHandle', '#container');
       * ```
       * @param {string} srcLocator CSS|XPath|strict locator.
       * @param {string} destLocator CSS|XPath|Strict locator.
       */
    static async dragAndDrop(srcLocator: string, destLocator: string) {
        try {
            if (srcLocator.startsWith("/") || srcLocator.startsWith(".") || srcLocator.startsWith("#") || srcLocator.startsWith("{")) {
                await I.waitForElement(srcLocator);
                if (process.env.BROWSER === "internet explorer") {
                    await I.scrollTo(srcLocator);
                }
                else {
                    await I.scrollIntoView(srcLocator, { behavior: "auto", block: "center", inline: "center" });
                }
                await I.waitForVisible(srcLocator);
                if (!(process.env.BROWSER === "internet explorer")) {
                    await I.waitForClickable(srcLocator);
                }
                await I.waitForVisible(destLocator);
                await I.dragAndDrop(srcLocator, destLocator);
            }
            else {
                await I.dragAndDrop(srcLocator, destLocator);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (srcLocator.startsWith("/") || srcLocator.startsWith(".") || srcLocator.startsWith("#") || srcLocator.startsWith("{")) {
                    await I.waitForElement(srcLocator);
                    if (process.env.BROWSER === "internet explorer") {
                        await this.scrollIntoView(srcLocator);
                    }
                    else {
                        await I.scrollIntoView(srcLocator, { behavior: "auto", block: "center", inline: "center" });
                    }
                    await I.waitForVisible(srcLocator);
                    if (!(process.env.BROWSER === "internet explorer")) {
                        await I.waitForClickable(srcLocator);
                    }
                    await I.waitForVisible(destLocator);
                    await I.dragAndDrop(srcLocator, destLocator);
                }
                else {
                    await I.dragAndDrop(srcLocator, destLocator);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("dragAndDrop : Error while performing drag and drop from element located by : " + srcLocator + " to " + destLocator);
            }
        }
    }

    /*
    Drag the scrubber of a slider to a given position For fuzzy locators, fields are matched by label text, the "name" attribute, CSS, and XPath.
    Parameters
    locator (string (opens new window)| object (opens new window)) located by label|name|CSS|XPath|strict locator.
    offsetX number (opens new window)position to drag. [!] returns a promise which is synchronized internally by recorder
    */

    static async dragSlider(locator: string, offset: number) {
        I.waitForVisible(locator);
        I.dragSlider(locator, offset)
    }






    static async click(locator: string, context?: string) {

        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                await I.waitForClickable(locator);
                if (isNullOrUndefined(context)) {
                    await I.click(locator);
                }
                else {
                    await I.click(locator, context);
                }
            }
            else {
                if (isNullOrUndefined(context)) {

                    await I.click(locator);


                }
                else {

                    await I.click(locator, context);


                }
            }
        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);




                    await I.waitForClickable(locator);
                    if (isNullOrUndefined(context)) {
                        await I.click(locator);
                    }
                    else {
                        await I.click(locator, context);
                    }
                }

                else {
                    if (isNullOrUndefined(context)) {

                        await I.click(locator);


                    }
                    else {

                        await I.click(locator, context);


                    }
                }

                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("click : Error while clicking on element located by : " + locator);
            }
        }
    }




    static async checkIfVisible(selector: any, ...options: any): Promise<any> {
        let flag = false;
        try {
            if (await I.grabNumberOfVisibleElements(selector)) {
                flag = true;
            }
            else {
                flag = false;
            }
        }
        catch (err) {
            console.log(err);
        }
        return flag;
    }



    /**
         * Asserts that two values are equal. If they are not,an assertion error is thrown. 
         * ```js
         * z.assertEqual(expected,actual)
         * ```
         * @param {any} expected 
         * @param {any} actual 
         */
    static async assertEqual(expected: any, actual: any) {
        await I.assertEqual(expected, actual);
    }

    /**
     * Returns all window handles. Useful for referencing a specific handle when calling I.switchToWindow(handle)
     * ```js
     * const windows = await I.grabAllWindowHandles();
     * ```
     * @returns {Array} windows
     */
    static async grabAllWindowHandles(): Promise<any> {
        let windows = await I.grabAllWindowHandles();
        return windows;
    }

    /**
     * Returns current window handle
     * ```js
     * const window = await z.grabCurrentWindowHandle();
     * ```
     * @returns {any} window
     */
    static async grabCurrentWindowHandle(): Promise<any> {
        let window: any = await I.grabCurrentWindowHandle();
        return window;
    }

    /**
     * Grabs the number of visible elements
     * ```js
     * let numOfElements = await z.grabNumberOfVisibleElements('p');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @returns {any} totalElements
     */
    static async grabNumberOfVisibleElements(locator: string): Promise<any> {
        let totalElements = await I.grabNumberOfVisibleElements(locator);
        return totalElements;
    }

    /**
     * Open new tab and switch to it.
     * ```js
     * z.openNewTab();
     * ```
     */
    static async openNewTab() {
        await I.openNewTab();
    }



    /**
     * Presses a key or a key in combination with modifier keys in the browser (on a focused element).
     * ```js
    * z.pressKey('Backspace');
    * ```
    *
    * To press a key in combination with modifier keys, pass the sequence as an array. All modifier keys (`'Alt'`, `'Control'`, `'Meta'`, `'Shift'`) will be released afterwards.
    *
    * ```js
    * z.pressKey(['Control', 'Z']);
    * ```
    *
    * For specifying operation modifier key based on operating system it is suggested to use `'CommandOrControl'`.
    * This will press `'Command'` (also known as `'Meta'`) on macOS machines and `'Control'` on non-macOS machines.
    *
    * ```js
    * z.pressKey(['CommandOrControl', 'Z']);
    * ```
    *
    * Some of the supported key names are:
    * - `'AltLeft'` or `'Alt'`
    * - `'AltRight'`
    * - `'ArrowDown'`
    * - `'ArrowLeft'`
    * - `'ArrowRight'`
    * - `'ArrowUp'`
    * - `'Backspace'`
    * - `'Clear'`
    * - `'ControlLeft'` or `'Control'`
    * - `'ControlRight'`
    * - `'Command'`
    * - `'CommandOrControl'`
    * - `'Delete'`
    * - `'End'`
    * - `'Enter'`
    * - `'Escape'`
    * - `'F1'` to `'F12'`
    * - `'Home'`
    * - `'Insert'`
    * - `'MetaLeft'` or `'Meta'`
    * - `'MetaRight'`
    * - `'Numpad0'` to `'Numpad9'`
    * - `'NumpadAdd'`
    * - `'NumpadDecimal'`
    * - `'NumpadDivide'`
    * - `'NumpadMultiply'`
    * - `'NumpadSubtract'`
    * - `'PageDown'`
    * - `'PageUp'`
    * - `'Pause'`
    * - `'Return'`
    * - `'ShiftLeft'` or `'Shift'`
    * - `'ShiftRight'`
    * - `'Space'`
    * - `'Tab'`
     * @param {string|Array} key
     */
    static async pressKey(key: string | string[]) {
        await I.pressKey(key);
    }



/*
Presses a key in the browser and leaves it in a down state.

To make combinations with modifier key and user operation (e.g. 'Control' + click).
Parameters
key string (opens new window)name of key to press down. [!] returns a promise which is synchronized internally by recorder
*/


static async pressKeyDown(key: string ) {
    await I.pressKeyDown(key);
}

/*
Releases a key in the browser which was previously set to a down state.

To make combinations with modifier key and user operation (e.g. 'Control' + click).
*/
static async pressKeyUp(key: string ) {
    await I.pressKeyUp(key);
}

   /**
     * Resize the current window to provided width and height. 
     * First parameter can be set to `maximize`.
     * ```js
     * z.resizeWindow(width, height)
     
     */
    static async resizeWindow(width: any, height?: any) {
        try {
            if(!isNullOrUndefined(height))
            {
                await I.resizeWindow(width,height);
            }
            else
            {
                    await I.resizeWindow(width, 0);
            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            await this.generateLog(timestamp, error);
            
            throw new Error("resizeWindow : Error resizing the current window " );
            }
        }

/*
Performs right click on a clickable element matched by semantic locator, CSS or XPath.
*/

static async rightClick(locator:string,context?:string){
    I.waitForVisible(locator)
    I.rightClick(locator)
}
/*
Saves screenshot of the specified locator to ouput folder (set in codecept.json or codecept.conf.js). Filename is relative to output folder.
*/

static async saveElementScreenshot(locator:string,fileName:string){
    I.waitForVisible(locator)
    I.saveElementScreenshot(locator,fileName)
}



    /**
     * Reload the current page.
     * ```js
     * z.refreshPage();
     * ```
     */
    static async refreshPage() {
        await I.refreshPage();
    }

    /**
     * Saves a screenshot to ouput folder (set in codecept.json or codecept.conf.js). 
     * Filename is relative to output folder. Optionally resize the window to the full available page scrollHeight and scrollWidth
     * to capture the entire page by passing true in as the second argument.
     * ```js
     * z.saveScreenshot('debug.png');
     * z.saveScreenshot('debug.png', true) //resizes to available scrollHeight and scrollWidth before taking screenshot
     * ``` 
     * @param {string} fileName
     * @param {boolean} fullPage optional
     */
    static async saveScreenshot(fileName: string, fullPage?: boolean) {
        if (isNullOrUndefined(fullPage)) {
            await I.saveScreenshot(fileName);
        }
        else {
            await I.saveScreenshot(fileName, fullPage);
        }
    }


      /**
     * Scroll page to the top.
     * ```js
     * z.scrollPageToTop();
     
     */
       static async scrollPageToTop() {
        try {
            await I.scrollPageToTop();
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            await this.generateLog(timestamp, error);
            
            throw new Error("scrollPageToTop : Error while scroll page to top " );
        }
    }
    
    /**
     * Scroll page to the bottom.
     * ```js
     * z.scrollPageToBottom();
     
     */
    static async scrollPageToBottom() {
    try {
        await I.scrollPageToBottom();
    }
    catch (error) {
        let timestamp = new Date().getTime();
        await I.saveScreenshot(timestamp.toString() + ".png");
        await this.generateLog(timestamp, error);
        
        throw new Error("scrollPageToBottom : Error while scroll page to bottom " );
    }
    }

    /**
     * Switches frame or in case of null locator reverts to parent.
     * ```js
     * z.switchTo('iframe'); // switch to first iframe
     * z.switchTo(); // switch back to main page
     * ```
     * @param {string} locator optional, CSS|XPath|strict locator.
     */
    static async switchTo(locator?: string) {
        if (!isNullOrUndefined(locator)) {
            await I.switchTo(locator);
        }
        else {
            await I.switchTo();
        }
    }

    /**
     * Switch focus to a particular tab by its number. It waits tabs loading and then switch tab.
     * ```js
     * z.switchToNextTab();
     * z.switchToNextTab(2);
     * ```
     * @param {number} tabNum optional, number of tabs to switch forward, default: 1.
     * @param {number} timeout optional, time in seconds to wait.
     */
    static async switchToNextTab(tabNum?: number) {
        await I.switchToNextTab(tabNum);

    }

    /**
     * Switch to the window with a specified handle.
     * ```js
     * const windows = await z.grabAllWindowHandles();
     * //  do something
     * await z.switchToWindow( windows[0] );
     *
     * const window = await z.grabCurrentWindowHandle();
     * //  do something
     * await z.switchToWindow( window );
     * ``` 
     * @param {string} window
     */
    static async switchToWindow(window: any) {
        await I.switchToWindow(window);
    }

    /**
     * Pauses execution for a number of seconds.
     * ```js
     * z.wait(2); // wait 2 secs
     * ```
     * @param {number} timeout
     */
    static async wait(timeout: any) {
        await I.wait(timeout);
    }

    /**
     * Waits for the visibility of element & for the specified value to be in value attribute.
     * ```js
     * z.waitForValue('//input', "GoodValue");
     * ```
     * @param {string} locator input field locator.
     * @param {string} value
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout"
     */
    static async waitForValue(locator: string, value: string, timeout?: number) {
        try {
            await I.waitForVisible(locator);
            if (isNullOrUndefined(timeout)) {
                await I.waitForValue(locator, value);
            }
            else {
                await I.waitForValue(locator, value, timeout);

            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("waitForValue : Error while waiting for value in element located by : " + locator);
        }
    }

    /**
     * Waits for the visibility of element.
     * ```js
     * z.waitForVisible('#popup');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout"  
     */
    static async waitForVisible(locator: string, timeout?: number) {
        var retry: number = 2;
        try {
            if (retry > 0) {
                if (!isNullOrUndefined(timeout)) {
                    await I.waitForVisible(locator, timeout);
                    retry = retry - 1;
                    this.waitForVisible(locator, timeout);
                }
                else {
                    await I.waitForVisible(locator);
                    retry = retry - 1;
                    this.waitForVisible(locator, timeout);
                }
            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("waitForVisible : Error while waiting for visibility of nn element located by : " + locator);

        }
    }

    /**
     * Waits for a text to appear. 
     * Element can be located by CSS or XPath. Narrow down search results by providing context.
     * ```js
     * z.waitForText('Thank you, form has been submitted');
     * z.waitForText('Thank you, form has been submitted', 5, '#modal');
     * ```
     * @param {string} text
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout"
     * @param {string} context optional, element located by CSS|XPath|strict locator.
     
     */
    static async waitForText(text: string, timeout?: number, context?: string) {
        try {
            if (!isNullOrUndefined(context) && isNullOrUndefined(timeout)) {
                await I.scrollIntoView(context, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForText(text, undefined, context);
            }
            else if (!isNullOrUndefined(timeout) && isNullOrUndefined(context)) {
                await I.waitForText(text, timeout);
            }
            else if (!isNullOrUndefined(timeout) && !isNullOrUndefined(context)) {
                await I.scrollIntoView(context, { block: "start" });
                await I.waitForText(text, timeout, context);
            }
            else if (isNullOrUndefined(context) && isNullOrUndefined(timeout)) {
                await I.waitForText(text);
            }

        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("waitForText : Error while waiting for text : " + text);

        }
    }

    /**
     * Waits for an element to be removed or become invisible on a page. 
     * Element can be located by CSS or XPath.
     * ```js
     * z.waitForInvisible('#popup');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout"
     */
    static async waitForInvisible(locator: string, timeout?: number) {
        try {
            if (isNullOrUndefined(timeout)) {
                await I.waitForInvisible(locator);
            }
            else {
                await I.waitForInvisible(locator, timeout);
            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("waitForInvisible : Error while waiting invisibility of element located by: " + locator);

        }
    }

    /**
     * Waits for an element to become enabled. 
     * Element can be located by CSS or XPath.
     * ```js
     * z.waitForEnabled('#popup');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout"
     */
    static async waitForEnabled(locator: string, timeout?: number) {
        try {
            if (isNullOrUndefined(timeout)) {
                await I.waitForEnabled(locator);
            }
            else {
                await I.waitForEnabled(locator, timeout);
            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("waitForEnabled : Error while waiting for element to be enabled located by: " + locator);

        }
    }

    /**
     * Waits for an element to be present on page. 
     * Element can be located by CSS or XPath.
     * ```js
     * z.waitForElement('.btn.continue');
     * z.waitForElement('.btn.continue', 5); // wait for 5 secs
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout" 
     */
    static async waitForElement(locator: string, timeout?: number) {
        try {
            if (!isNullOrUndefined(timeout)) {
                await I.waitForElement(locator, timeout);
            }
            else {
                await I.waitForElement(locator);

            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("waitForElement : Error while waiting for element to be present located by: " + locator);

        }
    }

    /**
     * Waits for an element to be clickable. 
     * Element can be located by CSS or XPath.
     * ```js
     * z.waitForClickable('.btn.continue');
     * z.waitForClickable('.btn.continue', 5); // wait for 5 secs
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {number} timeout optional, default timeout is value mentioned against key "waitForTimeout"    
     */
    static async waitForClickable(locator: string, timeout?: number) {
        try {
            if (isNullOrUndefined(timeout)) {
                await I.waitForClickable(locator);
            }
            else {
                await I.waitForClickable(locator, timeout);
            }
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");

            throw new Error("waitForClickable : Error while waiting for element to be clickable located by: " + locator);

        }
    }



    /**
     * Switch focus to a particular tab by its number. It waits tabs loading and then switch tab.
     * ```js
     * z.switchToPreviousTab();
     * z.switchToPreviousTab(2);
     * ```
     * @param {number} tabNum optional, number of tabs to switch backward, default: 1.
     * @param {number} timeout optional, time in seconds to wait.
     */
    static async switchToPreviousTab(tabNum?: number) {


        await I.switchToPreviousTab(tabNum);

    }





    /**
     * Scroll element into viewport.
     * ```js
     * z.scrollIntoView('#submit');
     * z.scrollIntoView('#submit', { behavior: "smooth", block: "center", inline: "center" });
     * z.scrollIntoView('#submit', true);
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {any} alignTop optional, or scrollIntoViewOptions (optional), 
     * see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView.
     
     */
    static async scrollIntoView(locator: string, alignTop?: any) {
        if (alignTop == null || alignTop == undefined) {
            await I.scrollIntoView(locator, alignTop);
        }
        else {
            await I.scrollIntoView(locator, { block: "start" })
        }
    }

    /**
     * Retrieves a text from an element located by CSS or XPath and returns it to test. 
     * Resumes test execution, so should be used inside static async with await operator.
     * If multiple elements found returns an array of texts.
     * ```js
     * let pin = await z.grabTextFrom('#pin');
     * ```
     * @param {string} locator element located by CSS|XPath|strict locator.
     * @returns {string|string[]} text 
     */
    static async grabTextFrom(locator: string): Promise<any> {
        let text: any = "";
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                text = await I.grabTextFrom(locator);
            }
            else {
                text = await I.grabTextFrom(locator);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    text = await I.grabTextFrom(locator);
                }
                else {
                    text = await I.grabTextFrom(locator);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("grabTextFrom : Error while fetching text from element located by: " + locator);
            }

        }

        return text;
    }

    static async grabTextFromAll(locator: string): Promise<any> {
        let text: any[] = [];
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                text = await I.grabTextFromAll(locator);
            }
            else {
                text = await I.grabTextFromAll(locator);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    text = await I.grabTextFromAll(locator);
                }
                else {
                    text = await I.grabTextFromAll(locator);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("grabTextFromAll : Error while fetching text from element located by: " + locator);
            }

        }

        return text;
    }


    /**
     * Waits for element to be visible, Clears element value & fills given value.
     * Throws error if any of the action fails in two attempts.
     * ```js
     * // by label
     * z.fillField('Email', 'hello@world.com');
     * // by name
     * z.fillField('password', secret('123456'));
     * // by CSS
     * z.fillField('form#login input[name=username]', 'John');
     * // or by strict locator
     * z.fillField({css: 'form#login input[name=username]'} 'John');
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {string} value
     */
    static async fillField(locator: string, value: any) {
        try {
            await this.clearField(locator);

            await I.fillField(locator, value);
        }
        catch (error) {
            try {

                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                await this.clearField(locator);

                await I.fillField(locator, value);
                await this.generateLog(timestamp, error);

            }
            catch (error) {

                throw new Error("fillField : Error while filling value in element located by : " + locator);
            }
        }
    }


    /**
     * Scrolls element into viewport, waits for that element to become visible & enabled, then Force clicks an element
     
     * ```js
     * z.forceClick('#hiddenButton');
     * z.forceClick('Click me', '#hidden');
     * ```
    * @param {string} locator CSS|XPath|strict locator.
     * @param {string} context (optional, null by default) element to search in CSS|XPath|Strict locator.
     */
    static async forceClick(locator: string, context?: string) {
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                await I.waitForEnabled(locator);

                if (isNullOrUndefined(context)) {
                    await I.forceClick(locator);
                }
                else {
                    await I.forceClick(locator, context);
                }
            }
            else {
                if (isNullOrUndefined(context)) {
                    await I.forceClick(locator);
                }
                else {
                    await I.forceClick(locator, context);
                }
            }
        }
        catch (error) {
            try {

                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);
                    await I.waitForEnabled(locator);

                    if (isNullOrUndefined(context)) {
                        await I.forceClick(locator);
                    }
                    else {
                        await I.forceClick(locator, context);
                    }
                }
                else {
                    if (isNullOrUndefined(context)) {
                        await I.forceClick(locator);
                    }
                    else {
                        await I.forceClick(locator, context);
                    }
                }

                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("forceClick : Error while clicking element located by : " + locator);

            }
        }
    }


    /**
     * Retrieves an attribute from an element located by CSS or XPath and returns it to test. An array as a result will be returned if there are more than one matched element. 
     * Resumes test execution, so should be used inside static async with await operator.
     * ```js
     * let hint = await z.grabAttributeFrom('#tooltip', 'title');
     * ```
     * @param {string} locator element located by CSS|XPath|strict locator.
     * @param {string} attribute attribute name.
     * @returns {string} text 
     */
    static async grabAttributeFrom(locator: string, attribute: string): Promise<any> {
        let value: any = "";
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {

                if (!(process.env.BROWSER === "internet explorer")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                }

                await I.waitForVisible(locator);
                value = await I.grabAttributeFrom(locator, attribute);
            }
            else {
                value = await I.grabAttributeFrom(locator, attribute);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    if (!(process.env.BROWSER === "internet explorer")) {
                        await I.waitForElement(locator);
                        await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    }
                    await I.waitForVisible(locator);
                    value = await I.grabAttributeFrom(locator, attribute);
                }
                else {
                    value = await I.grabAttributeFrom(locator, attribute);
                }
                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("grabAttributeFrom : Error while fetching attribute '" + attribute + "' from element located by: " + locator);
            }
        }

        return value;
    }

    static async grabAttributeFromAll(locator: string, attribute: string): Promise<any> {
        let value: any[] = [];
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {

                if (!(process.env.BROWSER === "internet explorer")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                }

                await I.waitForVisible(locator);
                value = await I.grabAttributeFromAll(locator, attribute);
            }
            else {
                value = await I.grabAttributeFromAll(locator, attribute);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    if (!(process.env.BROWSER === "internet explorer")) {
                        await I.waitForElement(locator);
                        await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    }
                    await I.waitForVisible(locator);
                    value = await I.grabAttributeFromAll(locator, attribute);
                }
                else {
                    value = await I.grabAttributeFromAll(locator, attribute);
                }
                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("grabAttributeFromAll : Error while fetching attribute '" + attribute + "' from element located by: " + locator);
            }
        }

        return value;
    }
    /*
    Get JS log from browser.
    */
    static async grabBrowserLogs(): Promise<any> {
        let BrowserLogs = await I.grabBrowserLogs();
        return BrowserLogs;
    }
    /**
     * Gets a cookie object by name.
     * If none provided gets all cookies.
     * Resumes test execution, so **should be used inside async function with `await`** operator.
     *
     * ```js
     * let cookie = await z.grabCookie('auth');
     * assert(cookie.value, '123456');
     * ```
     *
     * @param {?string} [name=null] cookie name.
     * @returns {Promise<string>} attribute value
     *
     */
    static async grabCookie(name: string): Promise<any> {
        let value: any = "";
        try {
            value = await I.grabCookie(name);
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await this.generateLog(timestamp, error);
            await I.saveScreenshot(timestamp.toString() + ".png");
            throw new Error("grabCookie : Error fetching cookie.");
        }
        return value
    }

    static async grabCssPropertyFromAll(locator: string, cssProperty: string): Promise<any> {
        let postHTML: any[] = [];
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                postHTML = await I.grabCssPropertyFromAll(locator, cssProperty);
            }
            else {
                postHTML = await I.grabCssPropertyFromAll(locator, cssProperty);
            }

        } catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            try {
                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);
                    postHTML = await I.grabCssPropertyFromAll(locator, cssProperty);
                }
                else {
                    postHTML = await I.grabCssPropertyFromAll(locator, cssProperty);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("grabCssPropertyFrom: Error while retrieving the css property from an element");
            }

        }
        return postHTML;
    }
    /**
    * Retrieves the cssProperty from an element located by CSS or XPath and returns it to test.
    * Resumes test execution, so **should be used inside async function with `await`** operator.
    * If more than one element is found - an array of HTMLs returned.
    *
    * ```js
    * const value = await I.grabCssPropertyFrom('h3', 'font-weight');
    * ```
    *
    * @param {CodeceptJS.LocatorOrString} element located by CSS|XPath|strict locator.
    *  @param {CodeceptJS.String} cssProperty CSS property name.
    * @returns {Promise<string>} CSS value
    */
    static async grabCssPropertyFrom(locator: string, cssProperty: string): Promise<string> {
        let postHTML: string = '';
        try {
            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                await I.waitForVisible(locator);
                postHTML = await I.grabCssPropertyFrom(locator, cssProperty);
            }
            else {
                postHTML = await I.grabCssPropertyFrom(locator, cssProperty);
            }

        } catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            try {
                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator, { behavior: "auto", block: "center", inline: "center" });
                    await I.waitForVisible(locator);
                    postHTML = await I.grabCssPropertyFrom(locator, cssProperty);
                }
                else {
                    postHTML = await I.grabCssPropertyFrom(locator, cssProperty);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("grabCssPropertyFrom: Error while retrieving the css property from an element");
            }

        }
        return postHTML;
    }


    /**
     * Get current URL from browser
     * Resumes test execution, so **should be used inside async function with `await`** operator.
     *
     * ```js
     * let url = await z.grabCurrentUrl();
     * ```
     *
     */

    static async grabCurrentUrl(): Promise<any> {
        let url = "";

        try {
            url = await I.grabCurrentUrl();
        } catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            await this.generateLog(timestamp, error);

            throw new Error("grabCurrentUrl : Error fetching current url.");
        }
        return url;
    }

    /*
    Grab the data from performance timing using Navigation Timing API. The returned data will contain following things in ms:
    
    responseEnd,
    domInteractive,
    domContentLoadedEventEnd,
    loadEventEnd Resumes test execution, so should be used inside an async function with await operator.
    Returns Promise (opens new window)<any> automatically synchronized promise through #recorder
    example return object:
    { // all results are in [ms]
      responseEnd: 23,
      domInteractive: 44,
      domContentLoadedEventEnd: 196,
      loadEventEnd: 241
    }
    */
    static async grabDataFromPerformanceTiming(): Promise<any> {
        let data = await I.grabDataFromPerformanceTiming();
        return data;
    }
/*
Grab the width, height, location of given locator. Provide width or heightas second param to get your desired prop. Resumes test execution, so should be used inside an async function with await operator.

Returns an object with x, y, width, height keys.
locator (string (opens new window)| object (opens new window)) element located by CSS|XPath|strict locator.
example return:
// value is like { x: 226.5, y: 89, width: 527, height: 220 }
*/
    static async grabElementBoundingRect(locator:string):Promise<any> {
        I.waitForVisible(locator);
        const value = await I.grabElementBoundingRect('h3');
        return value;

    }


       /**
         * Retrieves the innerHTML from an element located by CSS or XPath and returns it to test.
         * Resumes test execution, so **should be used inside async function with `await`** operator.
         * If more than one element is found - an array of HTMLs returned.
         *
         * ```js
         * let postHTML = await z.grabHTMLFrom('#post');
         * ```
         *
         * @param {CodeceptJS.LocatorOrString} element located by CSS|XPath|strict locator.
         * @returns {Promise<string>} HTML code for an element
         */
        static async grabHTMLFrom(locator:string): Promise<string>
        {
            let postHTML:string;
            try {
                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                    await I.waitForVisible(locator);
                    postHTML = await I.grabHTMLFrom(locator);
                }
                else {
                    postHTML = await I.grabHTMLFrom(locator);
                }               

            } catch (error) {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");
                try 
                {
                    if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                    {
                        await I.waitForElement(locator);
                        await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                        await I.waitForVisible(locator);
                        postHTML = await I.grabHTMLFrom(locator);
                    }
                    else {
                        postHTML = await I.grabHTMLFrom(locator);
                    } 
                    await this.generateLog(timestamp, error);
                } 
                catch (error) {
                    throw new Error("grabHTMLFrom: Error while retrieving the innerHTML from an element");
                }               
               
            }
            return postHTML;
        }
                /**
         * Retrieves all the innerHTML from elements located by CSS or XPath and returns it to test. 
         * Resumes test execution, so should be used inside async function with await operator.
         *
         * ```js
         * let postHTML = await z.grabHTMLFromAll('#post');
         * ```
         *
         * @param {CodeceptJS.LocatorOrString} element located by CSS|XPath|strict locator.
         * @returns {Promise<string>} HTML code for an element
         */
                 static async grabHTMLFromAll(locator:string): Promise<any>
                 {
                     let postHTMLs:any[]=[];
                     try 
                     {              
                         if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                         {
                             await I.waitForElement(locator);
                             await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                             await I.waitForVisible(locator);
                             postHTMLs  = await I.grabHTMLFromAll(locator);
                         }
                         else {
                             postHTMLs  = await I.grabHTMLFromAll(locator);
                         }             
                                         
                     } 
                     catch (error) {
                         let timestamp = new Date().getTime();
                         await I.saveScreenshot(timestamp.toString() + ".png");
                         try 
                         {
                             if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                             {
                                 await I.waitForElement(locator);
                                 await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                                 await I.waitForVisible(locator);
                                 postHTMLs  = await I.grabHTMLFromAll(locator);
                             }
                             else {
                                 postHTMLs  = await I.grabHTMLFromAll(locator);
                             } 
                             await this.generateLog(timestamp, error); 
                         } 
                         catch (error) {
                             throw new Error("grabHTMLFromAll: Error while retrieving all the innerHTML from elements");
                         }
                        
                     }
                     return postHTMLs;
                 }

                 
     /**
     * Grab number of open tabs.
     * Resumes test execution, so **should be used inside async function with `await`** operator.
     *
     * ```js
     * let tabs = await z.grabNumberOfOpenTabs();
     * ```
     *
     */

    static async grabNumberOfOpenTabs(): Promise<any> {
        try {
           
            let tabs = await I.grabNumberOfOpenTabs();
          
            return tabs;

        } catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            await this.generateLog(timestamp, error);

            throw new Error("grabNumberOfOpenTabs : Error fetching number of open tabs.");
        }

    }
    /*
    Retrieves a page scroll position and returns it to test. Resumes test execution, so should be used inside an async function with await operator.
    Returns Promise (opens new window)<PageScrollPosition> scroll position
    */

    static async grabPageScrollPosition():Promise<any> {
        let { x, y } = await I.grabPageScrollPosition();
        return
    }

/*
Grab the text within the popup. If no popup is visible then it will return null
*/
    static async grabPopupText():Promise<any> {
        let  x = await I.grabPopupText();
        return x
    }
/*
Retrieves page source and returns it to test. Resumes test execution, so should be used inside async function with await operator.
*/

static async pageSource():Promise<any> {
    let pageSource = await I.grabSource();
}

/*
Retrieves a page title and returns it to test. Resumes test execution, so should be used inside async with await operator.
*/
    static async grabTitle():Promise<any> {
        let pageSource = await I.grabTitle();
        return pageSource
    }


    static async grabValueFromAll(locator: string) :Promise<any>
    {
        let text: any[]=[];
                try 
        {

            if(locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
            {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                await I.waitForVisible(locator);
                text = await I.grabValueFromAll(locator);
            }
            else 
            {
                text = await I.grabValueFromAll(locator);
            }

        }
        catch (error) 
        {
            try
            {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if(locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                    await I.waitForVisible(locator);
                    text = await I.grabValueFromAll(locator);
                }
                else 
                {
                    text = await I.grabValueFromAll(locator);
                }
                
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("grabValueFromAll : Error while grabbing value from element located by :  " + locator);
            }
        }
        return text;
    }

    /**
     * Checks for element to be present, scrolls into view, waits for element to be visible and retrieves a value from a form element located by CSS or XPath, returns it to test.
     * Resumes test execution, so **should be used inside async function with `await`** operator.
     *
     * ```js
     * let email = await z.grabValueFrom('input[name=email]');
     * ```
     * @param {CodeceptJS.LocatorOrString} locator field located by label|name|CSS|XPath|strict locator.
     * @returns {Promise<any>} attribute value
     *
     */
     static async grabValueFrom(locator: string) :Promise<any>
     {
         let text: any = "";
         try 
         {
 
             if(locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
             {
                 await I.waitForElement(locator);
                 await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                 await I.waitForVisible(locator);
                 text = await I.grabValueFrom(locator);
             }
             else 
             {
                 text = await I.grabValueFrom(locator);
             }
 
         }
         catch (error) 
         {
             try
             {
                 let timestamp = new Date().getTime();
                 await I.saveScreenshot(timestamp.toString() + ".png");
 
                 if(locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                 {
                     await I.waitForElement(locator);
                     await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                     await I.waitForVisible(locator);
                     text = await I.grabValueFrom(locator);
                 }
                 else 
                 {
                     text = await I.grabValueFrom(locator);
                 }
                 
                 await this.generateLog(timestamp, error);
             }
             catch (error) {
                 throw new Error("grabValueFrom : Error while grabbing value from element located by :  " + locator);
             }
         }
         return text;
     }

    /**
     * Checks for element to be present, scrolls into view & Moves cursor to element matched by locator.
     * Extra shift can be set with offsetX and offsetY options.
     *
     * ```js
     * z.moveCursorTo('.tooltip');
     * z.moveCursorTo('#submit', 5,5);
     * ```
     *
     * @param {CodeceptJS.LocatorOrString} locator located by CSS|XPath|strict locator.
     * @param {number} [offsetX=0] (optional, `0` by default) X-axis offset.
     * @param {number} [offsetY=0] (optional, `0` by default) Y-axis offset.
     *
     *
     */
     static async moveCursorTo(locator: string,offsetX?:number,offsetY?:number) 
     {
         try 
         {
 
             if(locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
             {
                 await I.waitForElement(locator);
                 await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
 
             }
             
             if(isNullOrUndefined(offsetX) && isNullOrUndefined(offsetY))
             {
                 await I.moveCursorTo(locator);
             }
             else if(isNullOrUndefined(offsetX) && !(isNullOrUndefined(offsetY)))
             {
                 await I.moveCursorTo(locator,0,offsetY);
             }
             else if(!(isNullOrUndefined(offsetX)) && isNullOrUndefined(offsetY))
             {
                 await I.moveCursorTo(locator,offsetX,0);
             }
             else
             {
                 await I.moveCursorTo(locator,offsetX,offsetY);
             }
             
 
         }
         catch (error) 
         {
             try
             {
                 let timestamp = new Date().getTime();
                 await I.saveScreenshot(timestamp.toString() + ".png");
 
                 if(locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) 
                 {
                     await I.waitForElement(locator);
                     await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
 
                 }
                 
                 if(isNullOrUndefined(offsetX) && isNullOrUndefined(offsetY))
                 {
                     await I.moveCursorTo(locator);
                 }
                 else if(isNullOrUndefined(offsetX) && !(isNullOrUndefined(offsetY)))
                 {
                     await I.moveCursorTo(locator,0,offsetY);
                 }
                 else if(!(isNullOrUndefined(offsetX)) && isNullOrUndefined(offsetY))
                 {
                     await I.moveCursorTo(locator,offsetX,0);
                 }
                 else
                 {
                     await I.moveCursorTo(locator,offsetX,offsetY);
                 }
                     
                 await this.generateLog(timestamp, error);
             }
             catch (error) 
             {
                 throw new Error("moveCursorTo : Error while moving cursor to element located by :  " + locator);
             }
         }
     }

     




      /**
     * Scrolls to element matched by locator. Extra shift can be set with offsetX and offsetY options.
     * ```js
     * z.scrollTo('footer');
     * z.scrollTo('#submit', 5, 5);
     
     * ```
     * @param {string} locator located by CSS|XPath|strict locator.
     * @param {number} offsetX (optional, 0 by default) X-axis offset
     * @param {number} offsetY (optional, 0 by default) Y-axis offset.
     *
     
     */
       static async scrollTo(locator: string, offsetX?: number, offsetY?: number) {
        try 
        {
         if (!isNullOrUndefined(offsetX)) {
             await I.scrollTo(locator, offsetX);
         }
         else if (!isNullOrUndefined(offsetY)) {
             await I.scrollTo(locator, undefined ,offsetY);
         }
         else if (!isNullOrUndefined(offsetX) && !isNullOrUndefined(offsetY)) {
             await I.scrollTo(locator, offsetX, offsetY);
         }
         else {
             await I.scrollTo(locator);
         }
 
        } catch (error) 
        {
         let timestamp = new Date().getTime();
         await I.saveScreenshot(timestamp.toString() + ".png");
         await this.generateLog(timestamp, error);
 
         throw new Error("scrollTo : Error while scroll to element located by: " + locator);
        }
     }


     
    /**
     * Checks for the visibility of text, if optional context parameter given then searches for the visibility of text on the locator element.
     * Throws error if any of the action fails in two attempts.
     * ```js
     * z.see('Welcome'); // text welcome on a page
     * z.see('Welcome', '.content'); // text inside .content div
     * z.see('Register', {css: 'form.register'}); // use strict locator
     * ```
     * @param {string} text
     * @param {string} context optional, element located by CSS|Xpath|strict locator in which to search for text.
     */
    static async see(text: any, context?: string) {
        try {
            if (isNullOrUndefined(context)) {
                await I.wait(2);
                await I.see(text);
            }
            else {
                await I.waitForVisible(context);
                await I.see(text, context);
            }
        }
        catch (error) 
        {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (isNullOrUndefined(context)) {
                    await I.wait(2);
                    await I.see(text);
                }
                else 
                {
                    await I.waitForVisible(context);
                    await I.see(text, context);
                }

                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("see : Error while checking visibility of : " + text);
            }
        }
    }


         /**
     * Checks that all elements with given locator have given attributes.
     *
     * ```js
     * z.seeAttributesOnElements('//form', { method: "post"});
     * ```
     *
     * @param {CodeceptJS.LocatorOrString} locator located by CSS|XPath|strict locator.
     * @param {object} attributes attributes and their values to check.
     *
     */
          static async seeAttributesOnElements(locator: string, attributes: any)
          {
              try
              {
                  await I.wait(2);
                  await I.seeAttributesOnElements(locator, attributes);
              }
              catch(error)
              {
                  try 
                  {
                      let timestamp = new Date().getTime();
                      await this.generateLog(timestamp, error);
                      await I.saveScreenshot(timestamp.toString() + ".png"); 
          
                      await I.wait(2);
                      await I.seeAttributesOnElements(locator, attributes); 
      
                  } catch (error)
                  {
                      throw new Error("seeAttributesOnElements: Error while checking that all elements with given locator have given attributes. "+locator);
                  }
              }
          }


          
    /**
     * Scrolls element into viewport, waits for that element to become visible.
     * Then Verifies that the specified checkbox is checked.
     * 
     * ```js
     * z.seeCheckboxIsChecked('Agree');
     * z.seeCheckboxIsChecked('#agree'); 
     * z.seeCheckboxIsChecked({css: '#signup_form input[type=checkbox]'});
     * ```
     * @param {string} field  located by label|name|CSS|XPath|strict locator.
     */
    static async seeCheckboxIsChecked(field : string) {
        try {
            if (field.startsWith("/") || field.startsWith(".") || field.startsWith("#") || field.startsWith("{") || field.startsWith("(")) {
                await I.waitForElement(field);
                await I.scrollIntoView(field,{behavior: "auto", block: "center", inline: "center"});
                await I.waitForVisible(field);
                await I.seeCheckboxIsChecked(field);
            }

            else {
                await I.seeCheckboxIsChecked(field);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (field.startsWith("/") || field.startsWith(".") || field.startsWith("#") || field.startsWith("{") || field.startsWith("(")) {
                    await I.waitForElement(field);
                    await I.scrollIntoView(field,{behavior: "auto", block: "center", inline: "center"});
                    await I.waitForVisible(field);
                    await I.seeCheckboxIsChecked(field);
                }
    
                else {
                    await I.seeCheckboxIsChecked(field);
                }

                await this.generateLog(timestamp, error);

            }
            catch (error) {
                throw new Error("seeCheckboxIsChecked : Error while verfiying checkbox is checked: " + field);
            }
        }
    }

    /*
    Checks that cookie with given name exists.
    */
    static async seeCookie(name:string){
        I.seeCookie(name);
    }
/*
Checks that all elements with given locator have given CSS properties.
ex:I.seeCssPropertiesOnElements('h3', { 'font-weight': "bold"});

*/

    static async seeCssPropertiesOnElements(locator:string, cssproperties:Object){
        I.waitForVisible(locator)
        I.seeCssPropertiesOnElements(locator,cssproperties)
    }


    /**
      * {{> seeCurrentUrlEquals }}
      * url string (opens new window)value to check. [!] returns a promise which is synchronized internally by recorder
      */

     static async seeCurrentUrlEquals(url: string) {
        I.seeCurrentUrlEquals(url); // no auth cookie
    }
    /*
    dontSeeElementInDOM
    Opposite to seeElementInDOM. Checks that element is not on page.
    
    I.dontSeeElementInDOM('.nav'); // checks that element is not on page visible or not
    #Parameters
    locator (string (opens new window)| object (opens new window)) located by CSS|XPath|Strict locator. [!] returns a promise which is synchronized internally by recorder
    */

    static async seeElementInDOM(locator: string) {
        I.seeElementInDOM(locator);
    }
    /*
    *
    Checks that current url does not contain a provided fragment.
    */
    static async seeInCurrentUrl(verbOrfragmentofText: string) {
        I.seeInCurrentUrl(verbOrfragmentofText);
    }
   /*
    *
    Checks that a given Element is visible Element is located by CSS or XPath.
    */
    static async seeElement(locator: string) {
        I.seeElement(locator);
    }


    /*
    *Parameters
    field (string (opens new window)| object (opens new window)) located by label|name|CSS|XPath|strict locator.
    value string (opens new window)value to check. [!] returns a promise which is synchronized internally by recorder
    Checks that value of input field or textarea doesn't equal to given value Opposite to seeInField
    */
    static async seeInField(locator: string, value: string) {
        I.seeInField(locator, value);
    }

    /*
    Checks that title does not contain text
    Parameters
text string (opens new window)value to check. [!] returns a promise which is synchronized internally by recorder

    */
    static async seeInTitle(text: string) {
        I.seeInTitle(text);
    }
/*
Checks that the current page does not contains the given string in its raw source code.
*/
    static async dontSeeInSource(text: string) {
        I.dontSeeInSource(text);
    }
/*
Checks that the current page does not contains the given string in its raw source code.
*/
static async seeInSource(text: string) {
    I.seeInSource(text);
}
/*
Checks that the active JavaScript popup, as created by window.alert|window.confirm|window.prompt, contains the given string.
*/
static async seeInPopup(text: string) {
    I.seeInPopup(text);
}
/*
Asserts that an element appears a given number of times in the DOM. Element is located by label or name or CSS or XPath.
*/

static async seeNumberOfElements(locator : string, num:number) {
    I.seeNumberOfElements(locator,num);
}
/*
Asserts that an element is visible a given number of times. Element is located by CSS or XPath.
*/
static async seeNumberOfVisibleElements(locator : string, num:number) {
    I.seeNumberOfVisibleElements(locator,num);
}
/*
Checks that text is equal to provided one.
*/
static async seeTextEquals(text : string, locator:any) {
    I.seeTextEquals(text,locator);
}
/*
Checks that title is equal to provided one.

*/
static async seeTitleEquals(text : string) {
    I.seeTextEquals(text);
}

    /**
     * Scrolls element into viewport, waits for that element to become visible & clickable, then selects an option in a drop-down select.
     * Throws error if any of the action fails in two attempts.
     * 
     * ```js
     * z.selectOption('Choose Plan', 'Monthly'); // select by label
     * z.selectOption('subscription', 'Monthly'); // match option by text
     * z.selectOption('subscription', '0'); // or by value
     * z.selectOption('//form/select[@name=account]','Premium');
     * z.selectOption('form select[name=account]', 'Premium');
     * z.selectOption({css: 'form select[name=account]'} 'Premium');
     * ```
     * Provide an array for the second argument to select multiple options.
     * ```js
     * z.selectOption('Which OS do you use?', ['Android', 'iOS']);
     * ```
     * @param {string} locator CSS|XPath|strict locator.
     * @param {string|string[]} option CSS|XPath|Strict locator.
     */
     static async selectOption(locator: string, option: string) {
        try {

            if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                await I.waitForElement(locator);
                await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                await I.waitForVisible(locator);
                await I.waitForClickable(locator);
                await I.selectOption(locator, option);
            }
            else {
                await I.selectOption(locator, option);
            }

        }
        catch (error) {
            try {
                let timestamp = new Date().getTime();
                await I.saveScreenshot(timestamp.toString() + ".png");

                if (locator.startsWith("/") || locator.startsWith(".") || locator.startsWith("#") || locator.startsWith("{") || locator.startsWith("(")) {
                    await I.waitForElement(locator);
                    await I.scrollIntoView(locator,{behavior: "auto", block: "center", inline: "center"});
                    await I.waitForVisible(locator);
                    await I.waitForClickable(locator);
                    await I.selectOption(locator, option);
                }
                else {
                    await I.selectOption(locator, option);
                }
                await this.generateLog(timestamp, error);
            }
            catch (error) {
                throw new Error("selectOption : Error while selecting value on element located by :  " + locator);
            }
        }
    }
    /*
    Can be a single cookie object or an array of cookies:
    */
static async setCookie(coockies:Array<Object>|Object){
    I.setCookie(coockies)
}

    

      /**
       * Types out the given text into an active field. 
       * To slow down typing use a second parameter, to set interval between key presses. 
       * Note: Should be used when fillField is not an option.
       * ```js
       * z.type('Type this out.');
       * 
       * // typing values with a 100ms interval
       * z.type('4141555311111111', 100);
       * // When passing in an array
       * z.type(['T', 'E', 'X', 'T'])  
       *       
       * @param {string} key|keys  key or array of keys to type.
       * @param {number} delay (optional) delay in ms between key presses
       */
       static async type(key: string | string[], delay?: number) {
        try {
            if(isNullOrUndefined(delay))
            {
                await I.type(key)
            }
            else
            {
                await I.type(key, delay)
            }
            
        }
        catch (error) {
            let timestamp = new Date().getTime();
            await I.saveScreenshot(timestamp.toString() + ".png");
            await this.generateLog(timestamp, error);
            
            throw new Error("ERROR" + error + "\n" + key);
            }
        }

/*
Unselects a checkbox or radio button. Element is located by label or name or CSS or XPath.

The second parameter is a context (CSS or XPath locator) to narrow the search.

*/

static async uncheckOption(locator: string, context?:string|Object){
    I.waitForVisible(locator)
    I.waitForClickable(locator)
    I.uncheckOption(locator,context)

}




    static async generateLog(timestamp: number, error: any) {
        //console.info(timestamp + `:===================================================== \n ActionBot reported an error On step ${global.Step} \n\n for Scenario ${global.scenarioName}\n\n For module ${global.moduleName}\n=====================================================`);
        console.info("failed for " + error.stack);
        // await I.saveScreenshot(timestamp.toString() + ".png");
    }

}