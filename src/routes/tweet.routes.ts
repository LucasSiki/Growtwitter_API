import { Router } from "express";
import { TweetController } from "../Controllers/tweet.controller";
import validTokenMiddleware from "../middlewares/validToken.middleware";

export const TweetRoutes = () => {
  const router = Router();
  const tweetController = new TweetController();

  router.get("/", validTokenMiddleware, tweetController.listAll);

  router.post("/", validTokenMiddleware, tweetController.create);

  router.put("/", validTokenMiddleware, tweetController.update);

  router.delete(
    "/:tweet_id/:user_id",
    validTokenMiddleware,
    tweetController.delete
  );

  return router;
};