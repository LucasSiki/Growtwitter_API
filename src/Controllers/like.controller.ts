import { Request, Response } from "express";
import likeService from "../services/like.service"; 
import { Like } from "../models/like.model"; 

export class LikeController {
  public async listAll(req: Request, res: Response) {
    const result = await likeService.listAll();
    console.log(result);
    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { User_id, tweet_id } = req.body;

      const likeData = new Like(User_id, tweet_id);
      const result = await likeService.create(likeData);

      return res.status(201).send({
        ok: true,
        message: "You just liked this tweet",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { like_id, User_id } = req.params;

      const result = await likeService.delete(like_id, User_id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}