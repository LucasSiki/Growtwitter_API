import { v4 as createUuid } from "uuid";
import { Tweet } from "./tweet.model";

export class User {
  static password(password: any, password1: string) {
    throw new Error("Method not implemented.");
  }
  private User_id: string;

  constructor(
    private _name: string,
    private _email: string,
    private _username: string,
    private _password: string
  ) {
    this.User_id = createUuid();
  }

  public get id() {
    return this.User_id;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get username() {
    return this._username;
  }

  public get password() {
    return this._password;
  }

  public toJson() {
    return {
      id: this.User_id,
      name: this._name,
      email: this._email,
      username: this._username,
      password: this._password,
    };
  }
}