import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateTweetDto, UpdateTweetDto } from "../dtos/tweet.dto";
import { Tweet } from "../models/tweet.model";

class TweetService {
  public async listAll(): Promise<ResponseDto> {
    const data = await repository.tweet.findMany({
      include: {
        Like: true,
        Retweet: true,
      },
    });

    return {
      code: 200,
      message: "Tweets successfully listed",
      data,
    };
  }

  public async create(data: CreateTweetDto) {
    const tweet = new Tweet(data.user_id, data.content);

    const createTweet = await repository.tweet.create({
      data: {
        user_id: tweet.User_id,
        content: tweet.content,
        tweet_id: tweet.tweet_id,
      },
    });

    return createTweet;
  }

  public async update(data: UpdateTweetDto): Promise<ResponseDto> {
    const tweet = await repository.tweet.findUnique({
      where: {
        tweet_id: data.tweet_id,
        user_id: data.user_id,
      },
    });

    if (!tweet) {
      return {
        code: 404,
        message: "Tweet not found",
      };
    }

    const updateTweet = await repository.tweet.update({
      where: {
        tweet_id: data.tweet_id,
        user_id: data.user_id,
      },
      data: {
        content: data.content,
      },
    });

    return {
      code: 200,
      message: "Tweet updated successfully!",
      data: updateTweet,
    };
  }

  public async delete(
    tweet_id: string,
    user_id: string
  ): Promise<ResponseDto> {
    const tweet = await repository.tweet.findUnique({
      where: {
        tweet_id,
        user_id,
      },
    });

    if (!tweet) {
      return {
        code: 404,
        message: "Tweet not found",
      };
    }

    await repository.tweet.delete({
      where: {
        tweet_id,
        user_id,
      },
    });

    return {
      code: 200,
      message: "Tweet deleted",
    };
  }
}

export default new TweetService();