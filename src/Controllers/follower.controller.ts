import { Request, Response } from "express";
import FollowerService from "../services/follower.service";

export class FollowerController {
  public async listAll(req: Request, res: Response) {
    const result = await FollowerService.listAll();

    return res.status(result.code).send(result);
  }

  public async follow(req: Request, res: Response) {
    try {
      const { id_toFollow, id_whoWillFollow } = req.body;

      const result = await FollowerService.follow({
        user_id_follow: id_toFollow,
        user_id_followed: id_whoWillFollow,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async stopFollow(req: Request, res: Response) {
    try {
      const { User_idThatFollow, userWillStopFollow } = req.body;

      const result = await FollowerService.stopFollow({
        user_id_follow: User_idThatFollow,
        user_id_followed: userWillStopFollow,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}