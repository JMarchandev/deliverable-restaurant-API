import { DOMWorld, Page } from "puppeteer";

import { logError } from "./logger";

const puppeteer = require("puppeteer");

export const waitForSelector = async (page: Page, selector: string) => {
  try {
    return await page.waitForSelector(selector);
  } catch (error) {
    return error;
  }
};

export const getHTMLWebsite = async (url: string) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-fullscreen"],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(url);

    // await page.close();
    // await browser.close();

    return page;
  } catch (error) {
    logError(error, "puppeteer service");
    return error;
  }
};

export const getTextValuePage = async (page: any, selector: string) => {
  const el = await page.$(selector, (element: any) => element.innerHTML);
  return el;
};

export const setInputValue = async (
  page: Page,
  selector: string,
  value: string
) => {
  try {
    await waitForSelector(page, selector);
    await page.type(selector, value);
  } catch (error) {
    throw new Error(
      "Cannot set value in input, function => setInputValue \n" + error
    );
  }
};

export const clickButtonOnPage = async (page: Page, selector: string) => {
  try {
    await waitForSelector(page, selector);
    await page.click(selector, { delay: 1000 });
  } catch (error) {
    throw new Error(
      "Cannot click button, function => clickButtonOnPage \n" + error
    );
  }
};

export const focusElement = async (page: Page, selector: string) => {
  try {
    await waitForSelector(page, selector);
    await page.focus(selector);
  } catch (error) {
    throw new Error(
      "Cannot focus element, function => focusElement \n" + error
    );
  }
};

export const getValueOfAttribute = async (
  page: Page,
  selector: string,
  attribute: string
) => {
  try {
    await waitForSelector(page, selector);
    const attributeValue = await page.$eval(
      selector,
      (element: any, attr: any) => element.getAttribute(attr),
      attribute
    );
    return attributeValue.toString();
  } catch (error) {
    throw new Error(
      `Cannot get value of attribute '${attribute}', function => getValueOfAttribute \n` +
        error
    );
  }
};
