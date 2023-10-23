import express from "express";
import { LikeController } from "../Controllers/like.controller"; 

export const LikeRoutes = () => {
  const router = express.Router();
  const likeController = new LikeController();

  
  router.get("/", likeController.listAll);

  router.post("/", likeController.create);

  router.delete("/:like_id/:user_id", likeController.delete);

  return router;
};