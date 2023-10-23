import { Request, Response } from "express";
import RetweetService from "../services/retweet.service";
import { CreateRetweetDto, UpdateRetweetDto } from "../dtos/retweet.dto";
import retweetService from "../services/retweet.service";

export class RetweetController {
  public async listAll(req: Request, res: Response) {
    const result = await retweetService.listAll();
    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const data: CreateRetweetDto = req.body;
      const response = await RetweetService.create(data);
      return res.status(201).json({
        ok: true,
        message: "You retweeted this tweet",
        data: response,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        message: "Error when retweeting",
        data: null,
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const data: UpdateRetweetDto = req.body;
      const response = await RetweetService.update(data);
      return res.status(200).json({
        ok: true,
        message: "You just updated the retweet!",
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        message: "Error updating Retweet",
        data: null,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { retweet_id, User_id } = req.params;
      const response = await RetweetService.delete(retweet_id, User_id);
      return res.status(200).json({
        ok: true,
        message: "Retweet deleted",
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        message: "Error deleting retweet",
        data: null,
      });
    }
  }
}