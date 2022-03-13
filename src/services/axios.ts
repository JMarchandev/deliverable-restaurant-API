import axios from "axios";
// import { logError } from "./logger";

export const get = (url: string) => {
  console.log(url);
  axios
    .get(
      "https://www.ubereats.com/"
      ,
      {
        headers: {
            "Connection": "keep-alive",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      }
    )
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => console.log(err));
};
