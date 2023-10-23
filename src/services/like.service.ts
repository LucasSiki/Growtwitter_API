import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { Like } from "../models/like.model"; 

class LikeService {
  public async listAll(): Promise<ResponseDto> {
    const data = await repository.like.findMany();

    return {
      code: 200,
      message: "Likes listed successfully",
      data,
    };
  }

  public async create(data: Like): Promise<ResponseDto> {
    const createLike = await repository.like.create({
      data: {
        like_id: data.like_id,
        user_id: data.User,
        tweet_id: data.tweet_id,
      },
    });

    return {
      code: 200,
      message: "Like created successfully",
      data: createLike,
    };
  }

  public async delete(
    like_id: string,
    user_id: string
  ): Promise<ResponseDto> {
    const like = await repository.like.findUnique({
      where: {
        like_id,
        user_id,
      },
    });

    if (!like) {
      return {
        code: 404,
        message: "Like not found",
      };
    }

    await repository.like.delete({
      where: {
        like_id,
        user_id,
      },
    });

    return {
      code: 200,
      message: "Like deleted successfully",
    };
  }
}

export default new LikeService();