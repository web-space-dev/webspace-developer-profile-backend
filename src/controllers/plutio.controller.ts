import axios from "axios";

const base = "https://api.plutio.com";

/**
 * Fetch a person by ID
 *
 * @param {token: String}
 * @param {id: String}
 */
export const fetchPlutioUser = async (token: string, email: string) => {
  try {
    const response = await axios.get(
      `${base}/v1.8/people?role=team&contactEmails.address=${email}`,
      {
        method: "GET",
        // @ts-ignore
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Business: process.env.PLUTIO_BUSINESS_DOMAIN,
        },
      }
    );

    return response.data;

    // return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Generates a Plutio Access Token
 *
 * @returns
 */
export const generateAccessToken = async () => {
  try {
    const urlencoded = new URLSearchParams();

    urlencoded.append("client_id", process.env.PLUTIO_CLIENT_ID || "");
    urlencoded.append("client_secret", process.env.PLUTIO_CLIENT_SECRET || "");
    urlencoded.append("grant_type", "client_credentials");

    const data = await axios.post(`${base}/v1.8/oauth/token`, urlencoded);
    return data.data;
  } catch (err) {
    console.log("Error!", err);
    return err;
  }
};
