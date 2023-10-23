import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { updateUserDto, CreateUserDto } from "../dtos/user.dto"
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";

class UserService {

  public async listAll(): Promise<ResponseDto> {
    const data = await repository.user.findMany({
      include: {
        Tweet: true,
        followers: {
          include: {
            followers: true,
          },
        },
        following: {
          include: {
            following: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: "Users listed successfully!",
      data,
    };
  }

  public async BringNamePassword(username: string, password: string) {
    const user = await repository.user.findUnique({
      where: {
        username: username,
      },
    });
    const validPassword = await bcrypt.compare(user!.password, password);
    if (!validPassword) {
      return user;
    } else {
      return false;
    }
  }

  public async BringToken(token: string) {
    const user = await repository.user.findUnique({
      where: {
        token: token,
      },
    });

    return user;
  }

  public async create(data: CreateUserDto) {
    const user = new User(
      data.name,
      data.email,
      data.username,
      data.password
    );

    const verifyUsername = await repository.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (verifyUsername) {
      return {
        code: 400,
        message: "User already exists",
      };
    } else {
      const passwordHash = await bcrypt.hash(data.password, 10); 

      const CreateUserDto = await repository.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: passwordHash, 
          user_id: user.id,
        },
      });

      return CreateUserDto;
    }
  }

  public async delete(user_id: string): Promise<ResponseDto> {
    const User = await repository.user.findUnique({
      where: {
        user_id,
      },
    });

    if (!User) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    await repository.user.delete({
      where: {
        user_id,
      },
    });

    return {
      code: 200,
      message: "User deleted!",
    };
  }

  public async update(data: updateUserDto): Promise<ResponseDto> {

    const user = await repository.user.findUnique({
      where: {
        user_id: data.User_id,
      },
    });

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    const passwordHash = await bcrypt.hash(data.password, 10); 
    const updateUser = await repository.user.update({
      where: {
        user_id: data.User_id,
      },

      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: passwordHash,
        token: data.token,
      },
    });

    return {
      code: 200,
      message: "User update performed!",
      data: updateUser,
    };
  }
}

export default new UserService()