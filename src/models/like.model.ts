import {v4 as createUuid} from "uuid"

export class Like {
  private _like_id: string;
  private _User_id: string;
  private _tweet_id: string;
  User: any;

  constructor(user_id: string, tweet_id: string) {
    this._User_id = user_id;
    this._tweet_id = tweet_id;
    this._like_id = createUuid();
  }

  public get like_id() {
    return this._like_id;
  }

  public get User_id() {
    return this._User_id;
  }

  public get tweet_id() {
    return this._tweet_id;
  }

  public toJson() {
    return {
      like_id: this._like_id,
      User_id: this._User_id,
      tweet_id: this._tweet_id,
    };
  }
}