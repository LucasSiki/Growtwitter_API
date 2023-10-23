import { NextFunction, Request, Response } from "express";

import UserService from "../services/user.service";

async function validTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).send({
        message: "Token authentication failure (Token not provided)",
      });
    }

    const user = await UserService.BringToken(token as string);

    if (!user) {
      return res.status(401).send({
        message: "Token authentication failed!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
}

export default validTokenMiddleware;

