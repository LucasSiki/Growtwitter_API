import { Router } from "express";

import userPasswordMiddleware from "../middlewares/user.password.middleware";
import validTokenMiddleware from "../middlewares/validToken.middleware";
import { UserController } from "../Controllers/user.controller";

export const UserRoutes = () => {
  const router = Router();

  router.post("/", userPasswordMiddleware, new UserController().create);

  router.get("/", validTokenMiddleware, new UserController().list);

  router.put("/:id", validTokenMiddleware, new UserController().update);

  router.delete("/:id", validTokenMiddleware, new UserController().delete);

  return router;
};