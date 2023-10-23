import { Request, Response } from "express";
import UserService from "../services/user.service";

export class UserController {
  public async list(req: Request, res: Response) {
    const result = await UserService.listAll();

    return res.status(result.code).send(result);
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, username, password} = req.body;

      const result = await UserService.create({
        name,
        email,
        username,
        password,
      });
      if (result != null) {
        return res.status(201).send({
          ok: true,
          message: "User created successfully",
          data: result,
        });
      } else {
        res.status(500).send({
          ok: false,
          message: "Username already exists, try another!",
        });
      }
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await UserService.delete(id);

      return res.status(result.code).send(result);
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, username, password} = req.body;

      const result = await UserService.update({
        User_id: id,
        name,
        email,
        username,
        password,
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