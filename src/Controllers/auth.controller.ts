import { Request, Response } from "express";
import { ResponseDto } from "../dtos/response.dto";

import UserService from "../services/user.service";

class AuthController {
  public async create(req: Request, res: Response) {
    const { username, password} = req.body;

    const user = await UserService.BringNamePassword(username, password);

    if (!user) {
      return res.status(401).send({ message: "Incorrect username or password"});
    }

    const response: ResponseDto = {
      code: 200,
      message: "Login Successfully, welcome!",
    };

  }

  public async delete(req: Request, res: Response) {
    const { token } = req.headers;

    const User = await UserService.BringToken(token as string);

    if (User) {
      const response: ResponseDto = {
        code: 200,
        message: "Logout completed successfully, see you soon!",
      };

      return res.status(response.code).send(response);
    }

    const response: ResponseDto = {
      code: 404,
      message:
        "Logout not carried out! (Token not provided or invalid in the header!)",
    };

    return res.status(response.code).send(response);
  }
}

export default AuthController;