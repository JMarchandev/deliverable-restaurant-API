import {
  clickButtonOnPage,
  getValueOfAttribute,
  setInputValue,
} from "../services/puppeteer";

import { Page } from "puppeteer";
import { UberSearchRequestObject } from "../types";
import { getPageWebsite } from "./../services/scrapper";
import { logError } from "../services/logger";

type TargetUrl = "UBER_EATS" | "DELIVERRO";

const UBER_EATS = "https://www.ubereats.com/fr";
const DELIVERRO = "https://www.deliveroo.com/";

const getUrlByTarget = (targetURL: TargetUrl) => {
  switch (targetURL) {
    case "UBER_EATS":
      return UBER_EATS;
    case "DELIVERRO":
      return DELIVERRO;

    default:
      throw new Error("no restaurant found");
  }
};

const initWebsite = async (page: Page, request: UberSearchRequestObject) => {
  /**
   * Click for disable cookies
   */
  await clickButtonOnPage(
    page,
    "#cookie-banner > div > div > div.ah.gh > button.bc.gi.gj.ax.c6.c7.c8.bn.bo.bt.bu.ba.bb"
  );

  /**
   * Set input value, town, zipcode and restaurant name.
   */
  await setInputValue(
    page,
    "#location-typeahead-home-input",
    `${request.address} ${request.town} ${request.zipcode}`
  );

  /**
   * Valide input selection
   */
  await clickButtonOnPage(
    page,
    "#main-content > div.ag > div.cc.ao.ap.da.dj.ah.bf.ax > div > div.ah.e0.e1 > button"
  );

  await clickButtonOnPage(page, "#search-suggestions-typeahead-input");

  await setInputValue(
    page,
    "#search-suggestions-typeahead-input",
    request.restaurantName
  );

  await clickButtonOnPage(page, "#search-suggestions-typeahead-item-0 > a");
  const iconUrl = await getValueOfAttribute(
    page,
    "#main-content > div:nth-child(0n+4) > div > div.bf.ah.ai.bg.cc > img",
    "src"
  );

  const nameOfIcon = iconUrl.split("/")[iconUrl.split("/").length - 1];
  const restaurantStatus = nameOfIcon.split("restaurant_")[1].split(".")[0];

  return restaurantStatus;
};

export const getRestaurantAvailability = async (
  targetURL: TargetUrl,
  request: UberSearchRequestObject
) => {
  const url = getUrlByTarget(targetURL);
  try {
    const page = await getPageWebsite(url);
    const status = await initWebsite(page, request);
    return status;
  } catch (error) {
    logError(error, "uberController");
    return;
  }
};
