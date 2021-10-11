/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";

/**
 * Helpers for success / error responses
 */
import { handleError, handleSuccess } from "../helpers/responseHandler";
import RequestMiddleware from "../interfaces/express";
import { fetchPlutioUser, generateAccessToken } from "./plutio.controller";

/**
 * Handle a user signin
 *
 * @param req
 * @param res
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const plutioToken: any = await generateAccessToken();

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
     * Return a 200 response with the token and user
     */
    return res.status(200).json(
      handleSuccess({
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
