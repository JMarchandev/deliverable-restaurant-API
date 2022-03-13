import express, { Request, Response } from "express";

import { UberSearchRequestObject } from "../types";
import { getRestaurantAvailability } from "../controllers/uberController";

const router = express.Router();

router.get("/available-restaurant", async (req: Request, res: Response) => {
  try {
    setTimeout(() => {
      res
      throw new Error("TOO_MUCH_TIME");
    }, 15000);
    const { address, town, zipcode, restaurantName }: any = req.query;

    const restaurantAvailabilty = await getRestaurantAvailability("UBER_EATS", {
      address,
      town,
      zipcode,
      restaurantName,
    });

    return res.json({ restaurantName, status: restaurantAvailabilty });
  } catch (error) {
    return error;
  }
});

module.exports = router;
