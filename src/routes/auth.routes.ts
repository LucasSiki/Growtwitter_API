import { Router } from "express";
import AuthController from "../Controllers/auth.controller";
import userPasswordMiddleware from "../middlewares/user.password.middleware";

export const authRoutes = () => {
  const router = Router();
  const controller = new AuthController();

  router.post("/login", userPasswordMiddleware, controller.create);
  router.get("/logout", controller.delete);

  return router;
};