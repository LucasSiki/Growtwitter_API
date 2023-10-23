import { Router } from "express";
import validTokenMiddleware from "../middlewares/validToken.middleware";
import { RetweetController } from "../Controllers/retweet.controller";

export const RetweetRoutes = () => {
  const router = Router();
  const retweetController = new RetweetController();

  
  router.get("/", validTokenMiddleware, retweetController.listAll);

  router.post("/", validTokenMiddleware, retweetController.create);

  router.put("/", validTokenMiddleware, retweetController.update);

  router.delete(
    "/:retweet_id/:user_id",
    validTokenMiddleware,
    retweetController.delete
  );

  return router;
};