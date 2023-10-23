export interface CreateRetweetDto {
    tweet_id: string;
    user_id: string;
    content?: string;
  }
  
  export interface UpdateRetweetDto {
    retweet_id: string;
    tweet_id: string;
    user_id: string;
    content: string;
  }