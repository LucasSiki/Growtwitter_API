import { NextFunction, Request, Response } from "express";

function usernameValidPasswordMiddleware(req: Request, res: Response, next: NextFunction) {
  const { username, password} = req.body;

  if (!username || !password) {
    return res.status(400).send({
      ok: false,
      message: "Username or password not found",
    });
  }

  next();
}

export default usernameValidPasswordMiddleware;