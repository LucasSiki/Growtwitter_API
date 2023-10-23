import { v4 as createUuid } from "uuid";
export class Retweet {
  private _retweet_id: string;
  private _tweet_id: string;
  private _User_id: string;
  private _content: string;
  user: any;

  constructor(tweet_id: string, User_id: string, content: string = "") {
    this._retweet_id = createUuid();
    this._tweet_id = tweet_id;
    this._User_id = User_id;
    this._content = content;
  }

  public get retweet_id() {
    return this._retweet_id;
  }

  public get tweet_id() {
    return this._tweet_id;
  }

  public get User_id() {
    return this._User_id;
  }

  public get content() {
    return this._content;
  }

  public toJson() {
    return {
      retweet_id: this._retweet_id,
      tweet_id: this._tweet_id,
      User_id: this._User_id,
      content: this._content,
    };
  }
}