import { v4 as createUuid } from "uuid";

export class Tweet {
  private _tweet_id: string;
  private _content: string;

  constructor(private _User_id: string, content: string) {
    this._tweet_id = createUuid();
    this._content = content;
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
      tweet_id: this._tweet_id,
      User_id: this._User_id,
      content: this._content,
    };
  }
}