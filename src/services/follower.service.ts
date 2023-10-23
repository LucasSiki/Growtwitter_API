import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateFollowerDto, UpdateFollowerDto} from "../dtos/follower.dto";

class FollowerService {
  public async listAll(): Promise<ResponseDto> {
    const data = await repository.follower.findMany({
      include: {
        following: {
          include: {
            following: true, 
          },
        },
        followers: {
          include: {
            followers: true, 
          },
        },
      },
    });
    return {
      code: 200,
      message: "followers listed successfully",
      data,
    };
  }

  public async follow(data: CreateFollowerDto): Promise<ResponseDto> {
    const { user_id_follow, user_id_followed } = data;

    const Follower = await repository.follower.create({
      data: {
        user_id_follow,
        user_id_followed,
      },
    });

    return {
      code: 201,
      message: "User followed successfully!",
      data: Follower,
    };
  }

  public async stopFollow(data: UpdateFollowerDto): Promise<ResponseDto> {
    const { user_id_follow, user_id_followed } = data;

    const follower = await repository.follower.findFirst({
      where: {
        user_id_follow,
        user_id_followed,
      },
    });

    if (!follower) {
      return {
        code: 404,
        message: "You are not following this user",
      };
    }

    await repository.follower.deleteMany({
      where: {
        user_id_follow,
        user_id_followed,
      },
    });

    return {
      code: 200,
      message: "You unfollowed this user!",
    };
  }
}

export default new FollowerService();