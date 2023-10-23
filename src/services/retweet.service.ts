import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateRetweetDto, UpdateRetweetDto } from "../dtos/retweet.dto";
import { Retweet } from "../models/retweet.model";

class RetweetService {
  public async listAll(): Promise<ResponseDto> {
    const data = await repository.retweet.findMany({
      include: {
        Tweet: true,
      },
    });
    return {
      code: 200,
      message: "Successfully listed retweets",
      data,
    };
  }

  public async create(data: CreateRetweetDto) {
    const retweet = new Retweet(
      data.tweet_id,
      data.user_id,
      data.content || ""
    );

    const createRetweet = await repository.retweet.create({
      data: {
        retweet_id: retweet.retweet_id,
        tweet_id: retweet.tweet_id,
        user_id: retweet.User_id,
        content: retweet.content,
      },
    });

    return createRetweet;
  }

  public async update(data: UpdateRetweetDto): Promise<ResponseDto> {
    const retweet = await repository.retweet.findUnique({
      where: {
        retweet_id: data.retweet_id,
        tweet_id: data.tweet_id,
        user_id: data.user_id,
      },
    });

    if (!retweet) {
      return {
        code: 404,
        message: "Retweet not found",
      };
    }

    const updateRetweet = await repository.retweet.update({
      where: {
        retweet_id: data.retweet_id,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 200,
      message: "Retweet updated successfully!",
      data: updateRetweet,
    };
  }

  public async delete(
    retweet_id: string,
    user_id: string
  ): Promise<ResponseDto> {
    const retweet = await repository.retweet.findUnique({
      where: {
        retweet_id,
        user_id,
      },
    });

    if (!retweet) {
      return {
        code: 404,
        message: "Retweet not found",
      };
    }

    await repository.retweet.delete({
      where: {
        retweet_id,
      },
    });

    return {
      code: 200,
      message: "Retweet successfully deleted!",
    };
  }
}

export default new RetweetService();