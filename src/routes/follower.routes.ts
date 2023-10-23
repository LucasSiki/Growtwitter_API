import { Router } from "express";
import { FollowerController } from "../Controllers/follower.controller";
import validTokenMiddleware from "../middlewares/validToken.middleware";

export const FollowerRoutes = () => {
  const router = Router();
  const controller = new FollowerController();

  router.get("/", validTokenMiddleware, controller.listAll);
  router.post("/follow", controller.follow);
  router.post(
    "/stopFollow",
    validTokenMiddleware,
    controller.stopFollow
  );

  return router;
};