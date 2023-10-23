import { Request, Response } from "express";
import tweetService from "../services/tweet.service";

export class TweetController {
  public async listAll(req: Request, res: Response) {
    const result = await tweetService.listAll();
    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { user_id, content } = req.body;

      const result = await tweetService.create({ user_id, content });

      return res.status(201).send({
        ok: true,
        message: "Tweet posted!",
        data: result,
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { tweet_id, user_id, content } = req.body;

      const result = await tweetService.update({
        tweet_id,
        user_id,
        content,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { tweet_id, user_id } = req.params;

      const result = await tweetService.delete(tweet_id, user_id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}