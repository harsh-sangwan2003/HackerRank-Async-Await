const puppeteer = require('puppeteer');

const codeObj = require('./code');

let page;
const loginLink = "https://www.hackerrank.com/auth/login"
const email = "modefa7773@xgh6.com";
const passwd = "Samay@229";

// IIFE
(async () => {

    try {

        let browserInstance = await puppeteer.launch({

            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        })

        let newTab = await browserInstance.pages();
        page = newTab[0];
        await page.goto(loginLink);

        await page.waitForSelector("#input-1");
        await page.type("#input-1", email, { delay: 50 });
        await page.type("#input-2", passwd, { delay: 50 });
        await page.click('button[data-analytics="LoginPassword"]', { delay: 50 });

        await waitAndClick('a[data-attr1="algorithms"]', page);
        await waitAndClick('input[value="warmup"]', page);
        await page.waitForTimeout(4000);

        let questionArrPromise = await page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');

        await questionSolve(page, questionArrPromise[0], codeObj.answers[0]);


    } catch (err) {
        console.log(err)
    }
})();

async function waitAndClick(selector, cPage) {

    await cPage.waitForSelector(selector);
    let selectorClicked = await cPage.click(selector);
    return selectorClicked;
}

async function questionSolve(page, question, answer) {

    try {
        await question.click();

        await waitAndClick(".hr-monaco-base-editor", page);
        await page.click('input[type="checkbox"]');

        await page.waitForSelector("textarea.custominput");
        await page.type("textarea.custominput", answer, { delay: 10 });

        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.press("X");
        await page.keyboard.up("Control");

        await waitAndClick(".hr-monaco-base-editor", page);

        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.press("V");
        await page.keyboard.up("Control");

        await waitAndClick(".hr-monaco-submit", page);

        return await page.waitForTimeout(4000);

    } catch (err) {
        console.log(err);
    }


}