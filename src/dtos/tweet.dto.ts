export interface CreateTweetDto {
    user_id: string;
    content: string;
  }
  
  export interface UpdateTweetDto {
    tweet_id: string;
    user_id: string;
    content: string;
  }