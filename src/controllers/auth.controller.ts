/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";
// import fetch from "../mod.cjs";
// import https from "https";
import axios from "axios";
// const fetch = await import("node-fetch");

/**
 * Model Schema
 */
// import User from "../models/user.model";

/**
 * JSON Web token imports
 */
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

/**
 * Importing environment variables
 */
import config from "./../../config/config";

/**
 * Helpers for success / error responses
 */
import { handleError, handleSuccess } from "../helpers/responseHandler";
import RequestMiddleware from "../interfaces/express";
import { IAccessToken, IPerson } from "..//interfaces/plutio";

/**
 * Handle a user signin
 *
 * @param req
 * @param res
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    /**
     * Find a user with this email
     */
    // const user: any = await User.findOne({ email });

    /**
     * If no user is found, or if the password
     * doesn't match, drrthrow an error
     */
    // if (!user) throw new Error(`No user exists with the email ${email}`);

    // if (!user.authenticate(password))
    //   throw new Error("Email and Password don't match");

    const plutioToken: any = await generateAccessToken();
    console.log(plutioToken);

    if (plutioToken.status) {
      throw new Error("Could not connect to server");
    }

    const users: any = await fetchPlutioUser(plutioToken.accessToken, email);

    if (users.length === 0) throw new Error("Account does not exist");
    const user = users[0];
    const customFieldIndex = user.customFields.findIndex(
      (item: { _id: string }) => item._id === process.env.PLUTIO_BUSINESS_PIN_ID
    );
    const pin = user.customFields[customFieldIndex].value[0];
    if (password !== pin) throw new Error("Pin does not match");

    /**
     * Sign the user's unique ID into a
     * JSON Web Token string payload
     */
    // const token = jwt.sign(
    //   {
    //     _id: user._id,
    //   },
    //   config.jwtSecret
    // );

    /**
     * Set the token as a cookie in the response
     */
    // res.cookie("t", token, {
    //   expires: new Date(Date.now() + parseInt(config.SESSION_TTL, 10)),
    //   httpOnly: false,
    // });

    /**
     * Return a 200 response with the token and user
     */
    return res.status(200).json(
      handleSuccess({
        // token,
        user: {
          name: user.name.first + " " + user.name.last,
          email: user.contactEmails[0].address,
          _id: user._id,
        },
        accessToken: plutioToken.accessToken,
        accessTokenExpiresAt: plutioToken.accessTokenExpiresAt,
      })
    );
  } catch (err) {
    return res.status(401).json(handleError(err));
  }
};

/**
 * Clears the token from the response cookies
 * and responds with a 200 status
 *
 * @param req
 * @param res
 */
export const signout = async (req: Request, res: Response) => {
  res.clearCookie("t");
  return res.status(200).json(handleSuccess("Signed out"));
};

/**
 * Ensure a user is signed in before continuing
 */
// export const requireSignin = expressJwt({
//   secret: config.jwtSecret,
//   userProperty: "auth",
// });

/**
 * Ensure a user has authorization, and is the logged in user before continuing
 * If not, respond with a 403 response
 */
export const hasAuthorization = (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const authorized =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id;

  if (!authorized) {
    return res
      .status(403)
      .json(handleError("You are not authorized to access this information"));
  }

  next();
};

// /**
//  * Get a user by their access token
//  *
//  * @param {Request} req
//  * @param {Response} res
//  */
// export const getUser = async (req: RequestMiddleware, res: Response) => {
//   /**
//    * Find a user with this email
//    */
//   const user: any = await User.findById(req.auth._id);

//   /**
//    * Return a 200 response with the token and user
//    */
//   return res.status(200).json(
//     handleSuccess({
//       token: req.params.token,
//       user: { name: user.name, email: user.email, _id: user._id },
//     })
//   );
// };

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
const generateAccessToken = async () => {
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
